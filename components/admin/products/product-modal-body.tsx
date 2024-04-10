import { DeleteIcon, PlusIcon } from '@/components/icons';
import { CreateProductPayload, ProductListItem } from '@/types/product';
import {
  Avatar,
  Button,
  Input,
  ModalBody,
  VisuallyHidden,
} from '@nextui-org/react';
import React, { Dispatch, SetStateAction } from 'react';

const ImageUploader = ({
  product,
  setProduct,
}: {
  product: Partial<CreateProductPayload>;
  setProduct: Dispatch<SetStateAction<Partial<CreateProductPayload>>>;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setProduct({ ...product, image: reader.result as string });
      };
    }
  };

  return (
    <div>
      <VisuallyHidden>
        <input
          type='file'
          id='file'
          onChange={handleFileChange}
          accept='image/*'
        />
      </VisuallyHidden>
      <label htmlFor='file'>
        <Avatar
          size='lg'
          src={product?.image}
          className='cursor-pointer hover:opacity-80 transition-opacity'
          radius='lg'
          isBordered
          icon={!product.image ? <PlusIcon /> : undefined}
          onClick={(e) => {
            e.preventDefault();
            if (product.image) {
              setProduct({ ...product, image: '' });
            } else {
              const fileInput = document.getElementById('file');
              fileInput?.click();
            }
          }}
        />
      </label>
    </div>
  );
};

export const ProductModalBody = ({
  product,
  setProduct,
}: {
  product: Partial<ProductListItem>;
  setProduct: Dispatch<SetStateAction<Partial<ProductListItem>>>;
}) => {
  return (
    <ModalBody className='gap-4'>
      <div className='flex items-center gap-4'>
        <ImageUploader product={product} setProduct={setProduct} />
        <Input
          label='Name'
          placeholder='Product name'
          variant='flat'
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          isRequired
          size='lg'
        />
      </div>
      <Input
        label='Price'
        variant='flat'
        value={String(product.price)}
        onChange={(e) => setProduct({ ...product, price: +e.target.value })}
        isRequired
        className='max-h-xs'
      />
    </ModalBody>
  );
};
