import React, { useState } from "react";
import { Dialog } from "components/ui";
import { toggleTradeDialog, setSelectedRow } from "../store/stateSlice";
import TradeForm from "components/Apps/crypto/TradeForm";
import ProceedTrade from "components/Apps/crypto/ProceedTrade";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom'
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";

const TradeDialog = () => {
  const dispatch = useDispatch();

  const navigate = useRouter();

  const tradeDialogOpen = useSelector(
    (state) => state.cryptoMarket.state.tradeDialogOpen
  );
  const selectedRow = useSelector(
    (state) => state.cryptoMarket.state.selectedRow
  );

  const [showProceed, setShowProceed] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [status, setStatus] = useState("");

  const onDialogClose = () => {
    dispatch(toggleTradeDialog(false));
    setTimeout(() => {
      dispatch(setSelectedRow({}));
      setShowProceed({});
      setConfirmLoading(false);
      setStatus("");
    }, 500);
  };

  const handleTrade = (values, setSubmitting, trade) => {
    setSubmitting(true);
    setTimeout(() => {
      setShowProceed({ ...values, type: trade });
      setConfirmLoading(false);
      setStatus("");
    }, 500);
  };

  const hadleConfirm = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setStatus("SUCCESS");
    }, 1000);
  };

  const handleDone = (redirect) => {
    onDialogClose();
    if (redirect) {
      navigate.push("/Apps/crypto/wallets");
    }
  };

  return (
    <Dialog
      isOpen={tradeDialogOpen}
      onRequestClose={onDialogClose}
      onClose={onDialogClose}
      closable={!status}
      width={400}
    >
      <h5 className="mb-4">
        {isEmpty(showProceed) && !status && `Trade ${selectedRow.symbol}`}
        {!isEmpty(showProceed) && !status && "Order preview"}
      </h5>
      {isEmpty(showProceed) ? (
        <TradeForm
          amount={selectedRow.price}
          symbol={selectedRow.symbol}
          onBuy={(values, setSubmitting) =>
            handleTrade(values, setSubmitting, "BUY")
          }
          onSell={(values, setSubmitting) =>
            handleTrade(values, setSubmitting, "SELL")
          }
        />
      ) : (
        <ProceedTrade
          onConfirm={hadleConfirm}
          onDone={handleDone}
          loading={confirmLoading}
          status={status}
          {...showProceed}
        />
      )}
    </Dialog>
  );
};

export default TradeDialog;