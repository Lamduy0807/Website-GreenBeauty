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
  const apiGetBanner = "http://" + SERVER_NAME + "/rating/"+ id +"/0/";
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
const postLogin = async (email,password) =>{
  const apiPostLogin = "http://" + SERVER_NAME + "/login/";
  try {
    let response = await fetch(apiPostLogin, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });
    if(response.status === 200)
    {
      let responseJson = await response.json();
      console.log(response.status);
      return responseJson;
    }
    else 
      return {status: response.status, data : null}
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

const postRegister = async (email, password) =>{
  const apiPostRegister = "http://" + SERVER_NAME + "/register/";
  try {
    let response = await fetch(apiPostRegister, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}
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
  const apiGetUserInformation = 'http://' + SERVER_NAME + '/user/'+ id +'/';
  try {
    let response = await fetch(apiGetUserInformation, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
   
    console.error(`Error is: ${error}`);
  }
}

async function putUpdateUserInformation(id,token,email, name, phone, sex, birth){
  const apiPutUpdateUserInformation = 'http://' + SERVER_NAME + '/user/'+ id +'/';
  try {
    let response = await fetch(apiPutUpdateUserInformation, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        phone:phone,
        sex: sex,
        dateofbirth: birth,
      }),
    });
    return response.status;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }

}

export {getBanner, getProductRating, getProduct, postLogin, postRegister,getCart, getUserInformation, putUpdateUserInformation}