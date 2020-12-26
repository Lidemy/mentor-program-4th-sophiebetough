import React, { useState } from "react";
import {
  FormContainer,
  Form,
  FormTitle,
  FormInfoAboutDate,
  FormInfoAboutLocation,
  FormAttention,
  InputWrapper,
  InputTitle,
  InputField,
  OptionGroup,
  Option,
  OtherOpinion,
  OtherOpinionDescription,
  SubmitButton,
  RemindMessage,
  Footer,
} from "./style";

function App() {
  const [formValue, setFormValue] = useState({
    nickname: "",
    email: "",
    phone: "",
    reason: "",
    advice: "",
    type: "",
  }); // 初始值 & controlled component

  const handleInputChange = (e) => {
    const name = e.target.name;
    console.log(e.target.value);
    setFormValue({
      ...formValue,
      [name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    alert(`
      暱稱：${formValue.nickname}
      email：${formValue.email}
      手機號碼：${formValue.phone}
      報名類型：${formValue.type}
      如何知道活動 ：${formValue.reason}
      其他建議：${formValue.advice}
    `);
  };

  return (
    <>
      <FormContainer>
        <Form onSubmit={handleSubmitForm}>
          <FormTitle>新拖延運動報名表單</FormTitle>
          <FormInfoAboutDate>
            活動日期：2020/12/10 ~ 2020/12/11
          </FormInfoAboutDate>
          <FormInfoAboutLocation>
            活動地點：台北市大安區新生南路二段1號
          </FormInfoAboutLocation>
          <FormAttention>＊ 必填</FormAttention>
          <InputWrapper>
            <InputTitle>暱稱</InputTitle>
            <InputField
              required
              type="text"
              name="nickname"
              className="required"
              value={formValue.nickname}
              onChange={handleInputChange}
            />
            <InputTitle>電子郵件</InputTitle>
            <InputField
              required
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
            <InputTitle>手機號碼</InputTitle>
            <InputField
              required
              type="number"
              name="phone"
              value={formValue.phone}
              onChange={handleInputChange}
            />
            <InputTitle>報名類型</InputTitle>
            <OptionGroup>
              <Option
                required
                type="radio"
                name="type"
                value="躺在床上用想像力實作"
                onChange={handleInputChange}
              />
              躺在床上用想像力實作
            </OptionGroup>
            <OptionGroup>
              <Option
                required
                type="radio"
                name="type"
                value="趴在地上滑手機找現成的"
                onChange={handleInputChange}
              />
              趴在地上滑手機找現成的
            </OptionGroup>
            <InputTitle>怎麼知道這個活動？</InputTitle>
            <InputField
              required
              type="text"
              name="reason"
              value={formValue.reason}
              onChange={handleInputChange}
            />
            <OtherOpinion>其他</OtherOpinion>
            <OtherOpinionDescription>對活動的一些建議</OtherOpinionDescription>
            <InputField
              type="text"
              name="advice"
              value={formValue.advice}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <SubmitButton>提交</SubmitButton>
          <RemindMessage>請勿透過表單送出您的密碼。</RemindMessage>
        </Form>
      </FormContainer>
      <Footer>© 2020 © Copyright. All rights Reserved.</Footer>
    </>
  );
}

export default App;
