const SERVER_NAME = "127.0.0.1:8000";

async function getBanner() {
  const apiGetBanner = "http://" + SERVER_NAME + "/banner/";
  try {
    let response = await fetch(apiGetBanner, {
      method: "GET",
    });
    let responseJson = await response.json();
    console.log("responseJson detail", responseJson);
    console.log("banner:", responseJson);
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
    console.log("responseJson detail", responseJson);
    console.log("banner:", responseJson);
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
    console.log("responseJson detail", responseJson);
    console.log("banner:", responseJson);
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}



export {getBanner, getProductRating, getProduct}