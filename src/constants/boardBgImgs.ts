interface BoardBgImagesType {
  [key: string]: null | {
    preview: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
interface BoardBgPreviewsType {
  [key: string]: string;
}

const boardBgImages: BoardBgImagesType = {
  image_1: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-1-desc_zfehcj.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-1-desc_zfehcj.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-1-desc_zfehcj.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-1-desc_zfehcj.jpg',
  },
  image_2: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-2-desc_frvbzp.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-2-desc_frvbzp.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-2-desc_frvbzp.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-2-desc_frvbzp.jpg',
  },
  image_3: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-3-desc_gcwevb.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-3-desc_gcwevb.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-3-desc_gcwevb.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-3-desc_gcwevb.jpg',
  },
  image_4: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-4-desc_ompb32.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-4-desc_ompb32.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-4-desc_ompb32.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-4-desc_ompb32.jpg',
  },
  image_5: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-5-desc_wgkfmv.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-5-desc_wgkfmv.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-5-desc_wgkfmv.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-5-desc_wgkfmv.jpg',
  },
  image_6: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-6-desc_ek3bra.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-6-desc_ek3bra.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-6-desc_ek3bra.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-6-desc_ek3bra.jpg',
  },
  image_7: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-7-desc_snpkd6.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-7-desc_snpkd6.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-7-desc_snpkd6.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-7-desc_snpkd6.jpg',
  },
  image_8: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-8-desc_ie4oqo.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-8-desc_ie4oqo.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-8-desc_ie4oqo.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-8-desc_ie4oqo.jpg',
  },
  image_9: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-9-desc_ej6is5.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-9-desc_ej6is5.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-9-desc_ej6is5.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-9-desc_ej6is5.jpg',
  },
  image_10: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-10-desc_tvcudp.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-10-desc_tvcudp.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-10-desc_tvcudp.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-10-desc_tvcudp.jpg',
  },
  image_11: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-11-desc_ddsqdj.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-11-desc_ddsqdj.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-11-desc_ddsqdj.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-11-desc_ddsqdj.jpg',
  },
  image_12: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-12-descup_rlzkvu.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-12-descup_rlzkvu.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-12-descup_rlzkvu.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-12-descup_rlzkvu.jpg',
  },
  image_13: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-13-desc_yq59jp.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-13-desc_yq59jp.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-13-desc_yq59jp.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-13-desc_yq59jp.jpg',
  },
  image_14: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-14-desc_vaufhq.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-14-desc_vaufhq.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-14-desc_vaufhq.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-14-desc_vaufhq.jpg',
  },
  image_15: {
    mobile: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_375,h_812/pic-15-desc_dhafxb.jpg',
    tablet: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_768,h_956/pic-15-desc_dhafxb.jpg',
    desktop: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_1180,h_770/pic-15-desc_dhafxb.jpg',
    preview: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-15-desc_dhafxb.jpg',
  },
};

export const backgroundPreviews: BoardBgPreviewsType = {
  image_1: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-1-desc_zfehcj.jpg',
  image_2: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-2-desc_frvbzp.jpg',
  image_3: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-3-desc_gcwevb.jpg',
  image_4: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-4-desc_ompb32.jpg',
  image_5: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-5-desc_wgkfmv.jpg',
  image_6: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-6-desc_ek3bra.jpg',
  image_7: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-7-desc_snpkd6.jpg',
  image_8: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-8-desc_ie4oqo.jpg',
  image_9: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-9-desc_ej6is5.jpg',
  image_10: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-10-desc_tvcudp.jpg',
  image_11: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-11-desc_ddsqdj.jpg',
  image_12: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-12-descup_rlzkvu.jpg',
  image_13: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-13-desc_yq59jp.jpg',
  image_14: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-14-desc_vaufhq.jpg',
  image_15: 'https://res.cloudinary.com/dhs2bnhrk/image/upload/c_fill,w_28,h_28/pic-15-desc_dhafxb.jpg',
};

export default boardBgImages;