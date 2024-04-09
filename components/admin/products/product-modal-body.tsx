import { PlusIcon } from '@/components/icons';
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
        <Button
          variant='flat'
          color='primary'
          onClick={(e) => {
            e.preventDefault();
            const fileInput = document.getElementById('file');
            fileInput?.click();
          }}
          className='border-dashed border-1 border-primary-400 h-16 w-16 rounded-lg mr-4'
        >
          <PlusIcon />
        </Button>
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
      <Input
        label='Name'
        placeholder='Product name'
        variant='flat'
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        isRequired
      />
      <Input
        label='Price'
        variant='flat'
        value={String(product.price)}
        onChange={(e) => setProduct({ ...product, price: +e.target.value })}
        isRequired
      />
      <div className='flex items-center g-4 w-full'>
        <ImageUploader product={product} setProduct={setProduct} />

        {product.image ? (
          <Avatar
            size='lg'
            src={product.image}
            radius='lg'
            isBordered
            className='h-16 w-16'
            onClick={() => setProduct({ ...product, image: '' })}
          />
        ) : (
          <Avatar
            size='lg'
            radius='lg'
            isBordered
            name='img'
            className='h-16 w-16'
          />
        )}
      </div>
    </ModalBody>
  );
};
