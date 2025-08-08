import GooglePayButton from "@google-pay/button-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { RootState } from "../../store";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const totalPrice = cartItems
    ?.map((item: any) => Number(item.productPrice) * item.productQty)
    .reduce((prevValue: any, currValue: any) => prevValue + currValue, 0);

  let grandTotalPriceWithTax: any = 0;

  grandTotalPriceWithTax = (totalPrice + 100).toFixed(2);

  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["VISA", "MASTERCARD"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: grandTotalPriceWithTax,
          currencyCode: "USD",
          countryCode: "US",
        },
      }}
      onLoadPaymentData={(PaymentRequest) => {
        console.log("Load Payment Data!", PaymentRequest);
        toast.success("Your payment is successfully!");
        navigate("/products");
      }}
    />
  );
};

export default Payment;
