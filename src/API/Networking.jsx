const SERVER_NAME = "127.0.0.1:8000";

async function getBanner() {
  const apiGetBanner = "http://" + SERVER_NAME + "/banner/";
  try {
    let response = await fetch(apiGetBanner, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getProductRating(id) {
  const apiGetBanner = "http://" + SERVER_NAME + "/rating/" + id + "/0/";
  try {
    let response = await fetch(apiGetBanner, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getProduct() {
  const apiGetBanner = "http://" + SERVER_NAME + "/product/";
  try {
    let response = await fetch(apiGetBanner, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
const postLogin = async (email, password) => {
  const apiPostLogin = "http://" + SERVER_NAME + "/login/";
  try {
    let response = await fetch(apiPostLogin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      console.log(response.status);
      return responseJson;
    } else return { status: response.status, data: null };
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
};

const postRegister = async (email, password) => {
  const apiPostRegister = "http://" + SERVER_NAME + "/register/";
  try {
    let response = await fetch(apiPostRegister, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
};
async function getCart(id) {
  const apiGetCart = "http://" + SERVER_NAME + "/cart/?user=" + id;
  try {
    let response = await fetch(apiGetCart, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getUserInformation(id, token) {
  const apiGetUserInformation = "http://" + SERVER_NAME + "/user/" + id + "/";
  try {
    let response = await fetch(apiGetUserInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    let responseJson = await response.json();
    console.log("user infomation:", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function putUpdateUserInformation(
  id,
  token,
  email,
  name,
  phone,
  sex,
  birth
) {
  const apiPutUpdateUserInformation =
    "http://" + SERVER_NAME + "/user/" + id + "/";
  try {
    let response = await fetch(apiPutUpdateUserInformation, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone: phone,
        sex: sex,
        dateofbirth: birth,
      }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get product by id
async function getProductById(id) {
  const apiGetProductById =
    'http://' + SERVER_NAME + '/product/' + id + '/?IsActive=true';
  try {
    let response = await fetch(apiGetProductById, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get list image
async function getListImage(id) {
  const apiListImage =
    'http://' + SERVER_NAME + '/img/?product=' + id ;
  try {
    let response = await fetch(apiListImage, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


async function getIngredientInformation(ingred) {
  const apiGetIngredientInformation =
    "http://" + SERVER_NAME + "/ingredient/" + ingred + "/";
  try {
    let response = await fetch(apiGetIngredientInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getOrderInformation(id) {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/order/?user=" + id;
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getDetailOrderInformation(id) {
  const apiGetDetailOrderInformation =
    "http://" + SERVER_NAME + "/detailorder/?order=" + id;
  try {
    let response = await fetch(apiGetDetailOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getProductFromLoveList(user_id) {
  const apiGetProductFromLoveList =
    "http://" + SERVER_NAME + "/lovelist/?customer_id=" + user_id;

  try {
    let response = await fetch(apiGetProductFromLoveList, { method: "GET" });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getAddress(id, token) {
  const apiGetAddress = "http://" + SERVER_NAME + "/delivery/?user=" + id;
  try {
    let response = await fetch(apiGetAddress, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getProvince() {
  const apiProvince = "https://api.tiki.vn/directory/v1/countries/VN/regions/";
  try {
    let response = await fetch(apiProvince, { method: "GET" });
    let responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Fetch api Quận/Huyện
async function getDistrict(city_id) {
  const apiDistrict =
    "https://api.tiki.vn/directory/v1/countries/VN/regions/" +
    city_id +
    "/districts/";
  try {
    let response = await fetch(apiDistrict, { method: "GET" });
    let responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Fetch api Phường/Xã
async function getWard(city_id, district_id) {
  const apiWard =
    "https://api.tiki.vn/directory/v1/countries/VN/regions/" +
    city_id +
    "/districts/" +
    district_id +
    "/wards";
  try {
    let response = await fetch(apiWard, { method: "GET" });
    let responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function putUserInformation(
  id,
  token,
  email,
  name,
  phone,
  sex,
  dateofbirth,
  avt
) {
  const apiPutUserInformation = "http://" + SERVER_NAME + "/user/" + id + "/";
  try {
    var form = new FormData();
    form.append("avt", avt);
    form.append("email", email);
    form.append("name", name);
    form.append("phone", phone);
    form.append("sex", sex);
    form.append("dateofbirth", dateofbirth);

    let response = await fetch(apiPutUserInformation, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    //let responseJson = await response.json();
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function postAddress(
  id,
  token,
  name,
  phone,
  address,
  fullAddress,
  defaultAddress
) {
  const apiAddAddress = "http://" + SERVER_NAME + "/delivery/";
  try {
    let response = await fetch(apiAddAddress, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        address: address,
        fullAddress: fullAddress,
        defaultAddress: defaultAddress,
        phone: phone,
        receiveName: name,
        receiveGender: "",
        user: id,
        province: 1,
        district: 1,
        ward: 1,
      }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function putConfirmDelivery(id) {
  const apiPutConfirmDelivery = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let response = await fetch(apiPutConfirmDelivery, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: 4,
        dateReceive: date,
      }),
    });
    //let responseJson = await response.json();
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function putCanceDlelivery(id) {
  const apiPutConfirmDelivery = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let response = await fetch(apiPutConfirmDelivery, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        status: 5,
        cancellationReason: "Huy don",
      }),
    });

    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getTypeOfCategory() {
  const apiGetType = 'http://' + SERVER_NAME + '/type/';
  try {
    let response = await fetch(apiGetType, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get category
async function getCategory(type_id) {
  const apiGetCategory = 'http://' + SERVER_NAME + '/category/?producttype=' + type_id;
  try {
    let response = await fetch(apiGetCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getAllCategory() {
  const apiGetAllCategory = 'http://' + SERVER_NAME + '/category/';
  try {
    let response = await fetch(apiGetAllCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getCategoryById(id) {
  const apiGetCategoryById = 'http://' + SERVER_NAME + '/category/'+ id;
  try {
    let response = await fetch(apiGetCategoryById, {
      method: 'GET',
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getProductByCategory(category) {
  const apiGetProductByCategory=
    'http://' + SERVER_NAME + '/product/?category=' + category ;
  try {
    let response = await fetch(apiGetProductByCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    // console.log("category:", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getProductByCategoryOrdering(category, order) {
  const apiGetProductByCategory=
    'http://' + SERVER_NAME + '/product/?category=' + category+'&ordering='+order ;
  try {
    let response = await fetch(apiGetProductByCategory, {
      method: 'GET',
    });
    let responseJson = await response.json();
    // console.log("category:", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function setRating(id) {
  const apiSetRatingById =
    'http://'+ SERVER_NAME +'/detailorder/' + id + '/set-rating/';
  try {
    let response = await fetch(apiSetRatingById, {
      method: 'POST',
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function postRatingInformation(id, token ,img,comment, defaultRating ) {
  const apiPostRatingInformation = "http://" + SERVER_NAME + "/product/" + id + "/add-rating/";
  try {
    var form = new FormData();
    form.append('img', img);
    form.append('comment', comment);
    form.append('point', defaultRating);

    let response = await fetch(apiPostRatingInformation , {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
    //let responseJson = await response.json();
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getSearchProduct(query) {
  const apiSearchProduct =
    'http://' +
    SERVER_NAME +
    '/product/?search=' +
    query +
    '&ordering=price';
  if (query != '') {
    try {
      let response = await fetch(apiSearchProduct, {method: 'GET'});
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
}
async function getSearchProductWithFiltering(query, filter) {
  const apiSearchProductWithFiltering =
    'http://' +
    SERVER_NAME +
    '/product/?search=' +
    query +
    '&ordering='+ filter;
  if (query != '') {
    try {
      let response = await fetch(apiSearchProductWithFiltering, {method: 'GET'});
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is: ${error}`);
    }
  }
}
async function getOrderInformationById(id) {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/order/" + id + "/";
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
async function getDeliveryInformationById(id) {
  const apiGetOrderInformation = "http://" + SERVER_NAME + "/delivery/" + id + "/";
  try {
    let response = await fetch(apiGetOrderInformation, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      let responseJson = await response.json();
      return responseJson;
    } else return "";
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
const postForgotPassword = async (email) => {
  const apiPostLogin = "http://" + SERVER_NAME + "/request-reset-email/";
  try {
    let response = await fetch(apiPostLogin, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
};
export {
  putCanceDlelivery,
  putConfirmDelivery,
  postAddress,
  putUserInformation,
  getWard,
  getDistrict,
  getProvince,
  getAddress,
  getProductFromLoveList,
  getDetailOrderInformation,
  getOrderInformation,
  getProductById,
  getBanner,
  getProductRating,
  getProduct,
  postLogin,
  postRegister,
  getCart,
  getUserInformation,
  putUpdateUserInformation,
  getIngredientInformation,
  getTypeOfCategory,
  getCategory,
  getProductByCategory,
  getAllCategory,
  getCategoryById,
  getProductByCategoryOrdering,
  setRating,
  postRatingInformation,
  getSearchProduct,
  getSearchProductWithFiltering,
  getListImage,
  getDeliveryInformationById,
  getOrderInformationById,
  postForgotPassword
};
