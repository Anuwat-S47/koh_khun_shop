export type CreateShopPayload = {
  name: string;
  logoUrl: string;
  address: string;
  phone: string;
};

export type CreateShopWithImgPayload = Omit<CreateShopPayload, "logoUrl"> & {
    logoUrl: File
}