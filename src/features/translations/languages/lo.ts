export const lo = {
  common: {
    save: "ບັນທຶກ",
    cancel: "ຍົກເລີກ",
    delete: "ລຶບ",
    edit: "ແກ້ໄຂ",
    add: "ເພີ່ມ",
    search: "ຄົ້ນຫາ",
    loading: "ກຳລັງໂຫຼດ...",
    confirm: "ຢືນຢັນ",
    back: "ກັບຄືນ",
  },

  shop: {
    title: "ຮ້ານຄ້າ",
    addShop: "ເພີ່ມຮ້ານ",
    editShop: "ແກ້ໄຂຮ້ານ",
    manage: "ຈັດການຮ້ານ",
    noShop: "ຍັງບໍ່ມີຂໍ້ມູນຮ້ານຄ້າ",
    name: "ຊື່ຮ້ານ",
    address: "ທີ່ຢູ່",
    phone: "ເບີໂທ",
    logo: "ໂລໂກ້ຮ້ານ",
  },
  product: {
    title: "ສິນຄ້າ",
    addProduct: "ເພີ່ມສິນຄ້າ",
    name: "ຊື່ສິນຄ້າ",
    price: "ລາຄາ",
    type: "ປະເພດສິນຄ້າ",
  },

  foodType: {
    title: "ປະເພດອາຫານ",
    add: "ເພີ່ມປະເພດອາຫານ",
    name: "ຊື່ປະເພດ",
  },

  table: {
    title: "ໂຕະ",
    add: "ເພີ່ມໂຕະ",
    name: "ຊື່ໂຕະ",
  },

  bill: {
    title: "ປະຫວັດການຂາຍ",
    subtotal: "ຍອດລວມ",
    discount: "ສ່ວນຫຼຸດ",
    total: "ຍອດສຸດທິ",
    status: "ສະຖານະ",
    pending: "ລໍຖ້າດຳເນີນການ",
    paid: "ຈ່າຍເງິນແລ້ວ",
    cancelled: "ຍົກເລີກ",
  },

  auth: {
    email: "ອີເມວ",
    password: "ລະຫັດຜ່ານ",
    login: "ເຂົ້າສູ່ລະບົບ",
    logout: "ອອກຈາກລະບົບ",
    logoutConfirm: "ທ່ານຕ້ອງການອອກຈາກລະບົບບໍ?",
    loginSuccess: "ເຂົ້າລະບົບສຳເລັດ",
    logoutSuccess: "ອອກຈາກລະບົບສຳເລັດ",
  },

  language: {
    title: "ພາສາ",
  },

  sidebar: {
    menu: "ເມນູ",
    dashboard: "ໜ້າຫຼັກ",
    settings: "ການຕັ້ງຄ່າ",
    shopSetting: "ຕັ້ງຄ່າຮ້ານຄ້າ",
    otherSettings: "ການຕັ້ງຄ່າອື່ນໆ",
  },

  validation: {
    emailRequired: "ກະລຸນາປ້ອນອີເມວ",
    passwordRequired: "ກະລຸນາປ້ອນລະຫັດຜ່ານ",
  },
} as const;
