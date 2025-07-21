import React, { useEffect } from 'react';
import { Modal } from '../ReusableComponent/Modal';
import Button from '../ReusableComponent/Button';
import { useCreateBooking } from '../../hooks/useEventHooks';
import type { BookingFormData } from '../../type';
import { getUserFromToken } from '../../utls/jwt';
import { useParams } from 'react-router-dom';
import { useGetSingleEvent } from '../../hooks/useRegisterAndLogin';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const statusOptions = ['PENDING', 'CONFIRMED', 'CANCELLED'];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, setValue, watch, createBookingMutation, isBookingPending } = useCreateBooking();
  const { id } = useParams();
  const { data: eventData } = useGetSingleEvent(id || "");
  const decodedToken = getUserFromToken();
  const userId = decodedToken?.id;

  const quantity = watch('quantity', 1);
  const price = eventData?.data?.price || 0;
  const totalPrice = price * quantity;

  // Set default values when modal opens or event/user changes
  useEffect(() => {
    setValue('eventId', id || '');
    setValue('userId', userId || '');
    setValue('quantity', 1);
    setValue('totalPrice', price);
    setValue('status', statusOptions[0]);
  }, [id, userId, price, setValue, isOpen]);

  // Update totalPrice when quantity or price changes
  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [quantity, price, totalPrice, setValue]);

  const handleFormSubmit = (data: BookingFormData) => {
    const mutateValue = {
      eventId: id,
      userId: userId,
      status: "PENDING",
      quantity: data.quantity,
      totalPrice: data.totalPrice,
    };
    // @ts-expect-error - mutateValue is of type any
    createBookingMutation(mutateValue);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
        <label>
          Price:
          <input
            type="number"
            value={price}
            readOnly
            className="border rounded px-2 py-1 w-full bg-gray-100"
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            min={1}
            {...register('quantity', { valueAsNumber: true, min: 1 })}
            className="border rounded px-2 py-1 w-full"
            required
          />
        </label>
        <label>
          Total Price:
          <input
            type="number"
            value={totalPrice}
            readOnly
            className="border rounded px-2 py-1 w-full bg-gray-100"
          />
        </label>
        <div className="flex gap-2 justify-end">
          <Button type="button" className="bg-gray-300 text-black" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-purple-500 text-white" isLoading={isBookingPending}>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};