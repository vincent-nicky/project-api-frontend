import { history } from '@umijs/max';
import { Button, Card, message, QRCode, Radio, Spin, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import Alipay from '@/components/Icon/Alipay';
import WxPay from '@/components/Icon/WxPay';
import { valueLength } from '@/pages/User/UserInfo';
import {
  createOrderUsingPOST1,
  // queryOrderStatusUsingPOST1,
  freePayUsingPOST,
} from '@/services/qiApi-backend/orderFreeController';
import { useParams } from '@@/exports';
import ProCard from '@ant-design/pro-card';
import wechat from '../../../../public/assets/WeChat.jpg';

const PayOrder: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<API.ProductOrderVo>();
  const [total, setTotal] = useState<any>('0.00');
  const [status, setStatus] = useState<string>('active');
  const [payType, setPayType] = useState<string>();
  const urlParams = new URL(window.location.href).searchParams;
  const codeUrl = urlParams.get('codeUrl');
  const urlPayType = urlParams.get('payType');
  const [qrCode, setQrCode] = useState<any>('暂未选择支付方式');
  const params = useParams();
  const [notOpenFree, setNotOpenFree] = useState<boolean>(true);
  const createOrderAndFreePay = async () => {
    setLoading(true);
    setStatus('loading');
    // @ts-ignore
    const res = await createOrderUsingPOST1({ productId: params.id, payType: payType });
    if (res.code === 0 && res.data) {
      setOrder(res.data);
      // @ts-ignore
      setTotal(res.data.total / 100);
      setStatus('active');
      setLoading(false);
      setQrCode(res.data.codeUrl);
      message.success("创建订单成功！")
      setNotOpenFree(false);

      // 支付订单
      const res2 = await freePayUsingPOST({orderNo: res.data?.orderNo, payType: payType});
      if (res2.data) {
        if (res2.data && res2.code === 0) {
          setLoading(true);
          message.loading('☀️0元购成功，打款中....');
          setTimeout(function () {
            setLoading(false);
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/account/center');
          }, 2000);
        } else {
          console.log('支付中...');
        }
      }
    }
    if (res.code === 50001) {
      history.back();
    }
  };

  // const queryOrderStatus = async () => {
  //   const currentTime = new Date();
  //   const expirationTime = new Date(order?.expirationTime as any);
  //   if (currentTime > expirationTime) {
  //     setStatus('expired');
  //   }
  //   return await queryOrderStatusUsingPOST1({ orderNo: order?.orderNo });
  // };

  const toAlipay = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    // setLoading(true);
    const res = await createOrderUsingPOST1({ productId: params.id, payType: 'ALIPAY' });
    if (res.code === 0 && res.data) {
      // message.loading("正在前往收银台,请稍后....")
      // setTimeout(() => {
      //   document.write(res?.data?.formData as string);
      //   setLoading(false)
      // }, 2000)
      setNotOpenFree(!notOpenFree);
    } else {
      setLoading(false);
    }
  };
  const changePayType = (value: string) => {
    setPayType(value);
  };
  useEffect(() => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    // 判断是否为手机设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
    if (codeUrl) {
      if (isMobile) {
        window.location.href = codeUrl;
        return;
      }
      setQrCode(codeUrl);
      setStatus('active');
      setPayType('WX');
      return;
    }
    if (!urlPayType && !payType) {
      message.info('请选择支付方式！');
      setStatus('expired');
      return;
    }
    if (urlPayType) {
      setPayType(urlPayType);
      return;
    }
    // createOrder();
  }, []);

  useEffect(() => {
    if (payType === 'ALIPAY') {
      // toAlipay();
      setNotOpenFree(false)
    }
    if (payType === 'WX' && !codeUrl) {
      // createOrder();
      setNotOpenFree(false)
    }
  }, [payType]);

  // 这段代码是一段React函数组件中的代码，它使用了React Hooks来处理一个具体的场景，可能是与订单支付和状态相关的逻辑。让我为你解释它的每个部分：
  //
  // if (order && order.orderNo && order.codeUrl)：这是一个条件语句，它首先检查 order 对象是否存在（不是null或undefined），然后检查 order 对象中是否存在 orderNo 和 codeUrl 属性。
  // 如果这些条件都为真（即order、order.orderNo和order.codeUrl都存在），则进入条件块。
  //
  // const intervalId = setInterval(async () => { ... }, 3000);：在上述条件满足时，创建一个定时器，每隔3秒执行一次内部的箭头函数。这个定时器用于定期执行一些逻辑，可能是检查订单支付状态。
  // 在定时器的箭头函数中，执行以下操作：
  //   异步地调用 queryOrderStatus() 函数，这可能是用于查询订单状态的函数。
  //   根据返回的结果 res，如果支付成功（res.data 存在且 res.code 为0），则执行以下操作：
  //     调用 setLoading(true)，可能是用于显示加载状态的函数。
  //     使用 message.loading 显示一条消息，通知用户支付成功，资金正在打款中。
  //     停止定时器，通过 clearInterval(intervalId)。
  //     设置一个延迟2秒的定时器，用于在2秒后执行某些操作，例如重定向用户到新的URL。
  //   如果支付尚未成功，打印 "支付中..." 到控制台。
  //   if (status === 'expired')：这是在上述条件块之外的一个条件语句，它检查 status 是否等于字符串 'expired'。
  //   status 等于 'expired'，则停止定时器，通过 clearInterval(intervalId)。这表示如果 status 变成 'expired'，则取消之前设置的定时任务。
  // 最后，返回一个清除定时器的函数，这是一个 React Hook 的清理函数。这个函数在组件卸载时会自动被调用，用于清除之前设置的定时器，以防止内存泄漏和不必要的操作。
  // 整体来说，这段代码的目的是在满足特定条件下，设置一个定时器来定期检查订单支付状态，并根据状态的变化来触发一些用户界面的操作。如果订单支付成功，它将显示加载状态、提示消息，然后在一定时间后重定向用户。如果订单状态变为 'expired'，则会取消之前设置的定时任务。
  // useEffect(() => {
  //   if (order && order.orderNo && order.codeUrl) {
  //     const intervalId = setInterval(async () => {
  //       // 定时任务逻辑
  //       const res = await queryOrderStatus();
  //       if (res.data && res.code === 0) {
  //         setLoading(true);
  //         message.loading('支付成功,打款中....');
  //         clearInterval(intervalId);
  //         setTimeout(function () {
  //           setLoading(false);
  //           const urlParams = new URL(window.location.href).searchParams;
  //           history.push(urlParams.get('redirect') || '/account/center');
  //         }, 2000);
  //       } else {
  //         console.log('支付中...');
  //       }
  //     }, 3000);
  //     if (status === 'expired') {
  //       clearInterval(intervalId);
  //     }
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }
  // }, [order, status]);

  return (
    <>
      <Card style={{ minWidth: 385 }}>
        <Spin spinning={loading}>
          {/*<Card title={<strong>商品信息</strong>}>*/}
          {/*  <div style={{ marginLeft: 10 }}>*/}
          {/*    <h3>{order?.productInfo?.name}</h3>*/}
          {/*    <h4>*/}
          {/*      {valueLength(order?.productInfo?.description)*/}
          {/*        ? order?.productInfo?.description*/}
          {/*        : '暂无商品描述信息'}*/}
          {/*    </h4>*/}
          {/*  </div>*/}
          {/*</Card>*/}
          <br />
          <ProCard bordered headerBordered layout={'center'} title={<strong>支付方式</strong>}>
            <Radio.Group name="payType" value={payType}>
              <ProCard wrap gutter={18}>
                <ProCard
                  onClick={() => {
                    changePayType('WX');
                  }}
                  hoverable
                  style={{
                    border:
                      payType === 'WX' ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                    maxWidth: 260,
                    minWidth: 210,
                    margin: 10,
                  }}
                  colSpan={{
                    xs: 24,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12,
                  }}
                >
                  <Radio value={'WX'} style={{ fontSize: '1.12rem' }}>
                    <WxPay /> 微信支付
                  </Radio>
                </ProCard>
                <ProCard
                  onClick={() => {
                    changePayType('ALIPAY');
                  }}
                  hoverable
                  style={{
                    margin: 10,
                    maxWidth: 260,
                    minWidth: 210,
                    border:
                      payType === 'ALIPAY'
                        ? '1px solid #1890ff'
                        : '1px solid rgba(128, 128, 128, 0.5)',
                  }}
                  colSpan={{
                    xs: 24,
                    sm: 12,
                    md: 12,
                    lg: 12,
                    xl: 12,
                  }}
                >
                  <Radio value={'ALIPAY'} style={{ fontSize: '1.2rem' }}>
                    <Alipay /> 支付宝
                  </Radio>
                </ProCard>
              </ProCard>
            </Radio.Group>
          </ProCard>
          <br />
          <Card title={'支付金额'}>
            <br />
            {/*<ProCard style={{ marginTop: -30 }} layout={'center'}>*/}
            {/*  <QRCode*/}
            {/*    errorLevel="H"*/}
            {/*    size={240}*/}
            {/*    value={qrCode}*/}
            {/*    // @ts-ignore*/}
            {/*    status={status}*/}
            {/*    onRefresh={() => {*/}
            {/*      if (!payType) {*/}
            {/*        message.error('请先选择支付方式');*/}
            {/*        return;*/}
            {/*      }*/}
            {/*      // createOrder();*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</ProCard>*/}
            <ProCard
              style={{
                marginTop: -30,
                color: '#f55f4e',
                fontSize: 22,
                display: 'flex',
                fontWeight: 'bold',
              }}
              layout={'center'}
            >
              ￥{total}
            </ProCard>
            <ProCard style={{ marginTop: -20 }} layout={'center'}>
              <span>
                本商品为虚拟内容，购买后不支持<strong style={{ color: 'red' }}>退换</strong>
                。确认支付表示您已阅读并接受
                <a
                  target={'_blank'}
                  href={
                    'https://gitee.com/qimu6/statement/blob/master/%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.md#%E6%9F%92%E6%9C%A8%E6%8E%A5%E5%8F%A3%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE'
                  }
                  rel="noreferrer"
                >
                  {' '}
                  用户协议{' '}
                </a>
                如付款成功后10分钟后未到账，请联系站长微信：
                <Tooltip
                  placement="bottom"
                  title={<img src={wechat} alt="微信 code_nav" width="120" />}
                >
                  <a>17875806323</a>
                </Tooltip>
              </span>
            </ProCard>
          </Card>
          <br />
          <Card title={'点击支付'}>
            <div style={{textAlign: "right"}}>
              {notOpenFree && (
                <span style={{ color: 'red', marginLeft: 8 }} >请先选择支付方式！（走个流程）</span>
              )}
              <Button
                style={{ width: 100, padding: 5, marginLeft: 5 }}
                disabled={notOpenFree}
                onClick={ createOrderAndFreePay }
                size={'large'}
                type={'primary'}
              >
                0元购☀️
              </Button>
            </div>
          </Card>
        </Spin>
      </Card>
    </>
  );
};

export default PayOrder;
