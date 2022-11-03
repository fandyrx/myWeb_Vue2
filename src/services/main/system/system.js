import XRequest from "../../index";

export function getPageListData(url, queryInfo) {
  return XRequest.post({
    url,
    data: queryInfo,
  });
}

export function deletePageData(url) {
  return XRequest.delete({
    url,
  });
}

export function createPageData(url, newData) {
  console.log(newData, "services,:createPage");
  return XRequest.post({
    url,
    data: newData,
  });
}

export function editPageData(url, editData) {
  return XRequest.patch({
    url,
    data: editData,
  });
}
