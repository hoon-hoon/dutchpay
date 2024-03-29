import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { groupMembersState } from "../state/groupMembers"
import { expensesState } from "../state/expenses"
import styled from "styled-components"

export const AddExpenseForm = () => {
  const members = useRecoilValue(groupMembersState)

  const today = new Date()
  const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-"))
  const [desc, setDesc] = useState('')
  const [amount,setAmount] = useState(0)
  const [payer, setPayer] = useState(null)
  const [validated, setValidated] = useState(false)

  const [descValid, setDescValid] = useState(false)
  const [amountValid, setAmountValid] = useState(false)
  const [payerValid, setPayerValid] = useState(false)

  const setExpense = useSetRecoilState(expensesState)

  const handleSubmit = (event) => {
    event.preventDefault()

    setDescValid(desc.length > 0)
    setPayerValid(payer != null)
    setAmountValid(amount > 0)

    const form = event.currentTarget
    if (form.checkValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      }

      setExpense(expense => [
        ...expense,
        newExpense,
      ])
    }
    setValidated(true)
  }

  return (
    <StyledWrapper>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <StyleTitle>1. 비용 추가하기</StyleTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                name="expenseDate"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                required
                name="expenseDescription"
                placeholder="비용에 대한 설명을 입력해 주세요"
                value={desc}
                onChange={({target}) => setDesc(target.value)}
              />
              <Form.Control.Feedback
                type="invalid"
                data-valid={descValid}
              >
                  비용 내용을 입력해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                required
                name="expenseAmount"
                placeholder="비용은 얼마였나요?"
                value={amount}
                onChange={({target}) => setAmount(target.value)}
              />
              <Form.Control.Feedback
                data-valid={amountValid}
                type="invalid"
              >
                금액을 입력해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                required
                name="expensePayer"
                defaultValue=""
                className="form-control"
                onChange={({target}) => setPayer(target.value)}
              >
                <option disabled value="">누가 결제 했나요?</option>
                {members.map(member =>
                  <option key={member} value={member}>{member}</option>
                  )}
              </Form.Select>
              <Form.Control.Feedback
                data-valid={payerValid}
                type="invalid"
              >결제자를 선택해 주셔야 합니다.</Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="d-grid gap-2">
            <StyledSubmitButton>추가하기</StyledSubmitButton>
          </Col>
        </Row>
      </Form>
      </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding: 50px;
  background-color: #683BA1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;
  input, select {
    background: #59359A;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    color: #F8F9FA;
    height: 45px;
    &:focus {
      color: #F8F9FA;
      background: #59359A;
      filter: brightness(80%);
    }
    ::placeholder {
      color: #F8F9FA;
    }
  }
`
const StyleTitle = styled.h3`
  color: #FFFBFB;
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
`
const StyledSubmitButton = styled(Button).attrs({
  type: 'submit'
})`
  height: 60px;
  padding: 16px 32px;
  border: 0px;
  border-radius: 8px;
  background-color: #E2D9F3;
  color: #59359A;
  margin-top: 10px;
  &:hover, &:focus {
    background-color: #E2D9F3;
    filter: rgba(0,0,0,0.3);
  }
`