import styled from 'styled-components'
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(87, 151, 157);
`

export const FormContainer = styled.form`
  height: 235px;
  min-width: 500px;
  padding: 16px;
  border: 2px solid rgb(181, 219, 224);
`

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`
