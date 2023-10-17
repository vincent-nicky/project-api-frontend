// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** closedProductOrder POST /api/order/free/closed */
export async function closedProductOrderUsingPOST1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.closedProductOrderUsingPOST1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/free/closed', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** createOrder POST /api/order/free/create */
export async function createOrderUsingPOST1(
  body: API.PayCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductOrderVo>('/api/order/free/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProductOrderById GET /api/order/free/get */
export async function getProductOrderByIdUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductOrderByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductOrderVo>('/api/order/free/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listProductOrderByPage GET /api/order/free/list/page */
export async function listProductOrderByPageUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductOrderByPageUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderVo>('/api/order/free/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** parseOrderNotifyResult POST /api/order/free/notify/order */
export async function parseOrderNotifyResultUsingPOST1(
  body: string,
  options?: { [key: string]: any },
) {
  return request<string>('/api/order/free/notify/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** freePay POST /api/order/free/query/freePay */
export async function freePayUsingPOST(
  body: API.ProductOrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/free/query/freePay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryOrderStatus POST /api/order/free/query/status */
export async function queryOrderStatusUsingPOST1(
  body: API.ProductOrderQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/free/query/status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
