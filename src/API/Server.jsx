const SERVER_NAME = "127.0.0.1:8000";
//---
async function getListImages(productId) {
  const apiGetListImage =
    "http://" + SERVER_NAME + "/img/?product=" + productId;
  try {
    let response = await fetch(apiGetListImage, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


//---
async function getListRating(productId) {
  const apiGetListRating =
    "http://" + SERVER_NAME + "/rating/" + productId + "/0";
  try {
    let response = await fetch(apiGetListRating, {
      method: "GET",
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
//---
//Fetch sản phẩm trong giỏ hàng về
async function getProductFromCart(user_id, product_id) {
  const apiGetProductFromCart =
    "http://" +
    SERVER_NAME +
    "/cart/?user=" +
    user_id +
    "&product=" +
    product_id;
  try {
    let response = await fetch(apiGetProductFromCart, { method: "GET" });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
//---
async function getDataUser(userData, accessToken) {
  try {
    const user_token = accessToken;
    const user_id = userData.id;
    const user = {
      userID: user_id,
      userToken: user_token,
    };
    return user;
  } catch (error) {
    console.error(`Error is: ${error}`);
    console.log("Ở hàm getDataUser");
  }
}

//---
//Api thêm item vào giỏ hàng
async function postItemToCart(userData, accessToken, product, counter) {
  //console.log("productID:", product.id)
  console.log("asdsadsadasd: ",product);
  const apiAddItemToCart = "http://" + SERVER_NAME + "/cart/";
  try {
    let response = await fetch(apiAddItemToCart, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },

      body: JSON.stringify({
        quantities: counter,
        product: product,
        user: userData,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

///---
//Api cập nhật số lượng khi thêm sản phẩm
async function putItemInCart(event, product, accessToken, counter) {
  console.log("product:", product);
  const apiUpdateQuantity =
    "http://" + SERVER_NAME + "/cart/" + product.id + "/";
  let quantity = product.quantities;
  if (event === "+") {
    quantity = quantity + counter;
  } else if (event === "-") {
    quantity = quantity - 1;
  }

  try {
    let response = await fetch(apiUpdateQuantity, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " +accessToken,
      },

      body: JSON.stringify({
        quantities: quantity,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

//Api get address delivery
async function getAddressDelivery(token, userID, defaultAddress) {
  const apiGetAddress =
    'http://' +
    SERVER_NAME +
    '/delivery/?user=' +
    userID +
    '&defaultAddress=' +
    defaultAddress;
  try {
    let response = await fetch(apiGetAddress, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


async function postOrder(token, userID, totalValue, delivery_id) {
  const apiPostOrder = 'http://' + SERVER_NAME + '/order/';
  try {
    let response = await fetch(apiPostOrder, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },

      body: JSON.stringify({
        totalValue: totalValue,
        user:userID,
        status: '1',
        delivery: delivery_id,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function postOrderDetail(order_id, product_id, quantity) {
  const apiPostOrderDetail = 'http://' + SERVER_NAME + '/detailorder/';
  try {
    let response = await fetch(apiPostOrderDetail, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        quantities: quantity,
        order: order_id,
        product: product_id,
      }),
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


//Xóa item khỏi giỏ hàng
async function deleteProductFromCart(cart_id) {
  const apiDeleteProductFromCart =
    'http://' + SERVER_NAME + '/cart/' + cart_id + '/';
  try {
    let response = await fetch(apiDeleteProductFromCart, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


async function postToLoveList(userID,userToken, product_id) {
  const apiAddToLoveList = 'http://' + SERVER_NAME + '/lovelist/';
  try {
    let response = await fetch(apiAddToLoveList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },

      body: JSON.stringify({
        product_id: product_id,
        customer_id: userID,
      }),
    });

    let responseJson = await response.json();
    //console.log("responseJson:", responseJson)
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}


async function getProductFromLoveList(user_id) {
  const apiGetProductFromLoveList =
    'http://' + SERVER_NAME + '/lovelist/?customer_id=' + user_id;

  try {
    let response = await fetch(apiGetProductFromLoveList, {method: 'GET'});
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export {
  getListImages,
  getListRating,
  getProductFromCart,
  getDataUser,
  postItemToCart,
  putItemInCart,
  getAddressDelivery,
  postOrder,
  postOrderDetail,
  deleteProductFromCart,
  postToLoveList,
  getProductFromLoveList
};
