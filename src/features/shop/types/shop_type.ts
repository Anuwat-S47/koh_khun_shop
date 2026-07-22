export type CreateShopPayload = {
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
  createBy: string;
};

export type CreateShopWithImgPayload = Omit<CreateShopPayload, "logoUrl"> & {
    img: File
}