// components/LoanDetailModal.js
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";

export default function LoanDetailModal({ open, onClose, selectedLoan }) {
  if (!selectedLoan) {
    return null;
  }
  //   console.log("Selected Loan in Modal:", selectedLoan.propTypes);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>대출 상세 정보</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">채무자:</Typography>
            <Typography>{selectedLoan.debtor}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">대출금액:</Typography>
            <Typography>₩{Number(selectedLoan.loan_amount).toLocaleString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">물건주소:</Typography>
            <Typography>{selectedLoan.property_address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">접수일자:</Typography>
            <Typography>{selectedLoan.application_date}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">처리현황:</Typography>
            <Typography>{selectedLoan.status}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
}

// PropTypes validation
LoanDetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedLoan: PropTypes.shape({
    debtor: PropTypes.string,
    loan_amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    property_address: PropTypes.string,
    application_date: PropTypes.string,
    status: PropTypes.string,
  }),
};
