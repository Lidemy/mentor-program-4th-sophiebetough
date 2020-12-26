import styled from "styled-components";

export const FormContainer = styled.div`
  background: #ffffff;
  margin: 120px auto;
  max-width: 645px;
  box-shadow: -1.4px -1.4px 6px 0 rgba(0, 0, 0, 0.3);
  border-top: 8px solid #fad312;
  padding: 54px 42px;
`;

export const Form = styled.form``;

export const FormTitle = styled.h1`
  margin: 0;
  font-size: 32px;
`;

export const FormInfoAboutDate = styled.div`
  margin-top: 30px;
  line-height: 2em;
  font-size: 14px;
`;

export const FormInfoAboutLocation = styled.div`
  line-height: 2em;
  font-size: 14px;
`;

export const FormAttention = styled.p`
  color: #e74149;
  font-size: 16px;
  margin-top: 18px;
`;

export const InputWrapper = styled.div`
  margin-top: 55px;
`;

export const InputTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 50px;

  &:after {
    content: "*";
    color: #e74149;
    padding-left: 5px;
  }
`;

export const InputField = styled.input`
  margin-top: 22px;
  border: 1px solid #d0d0d0;
  font-size: 16px;
  padding: 3px;
  width: 45%;
`;

export const OptionGroup = styled.label`
  display: block;
  margin-top: 14px;
`;

export const Option = styled.input`
  display: inline-block;
  margin-right: 8px;
`;

export const OtherOpinion = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 50px;
`;

export const OtherOpinionDescription = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

export const SubmitButton = styled.button`
  color: #000000;
  font-size: 15px;
  background: #fad312;
  padding: 12px 32px;
  margin-top: 60px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

export const RemindMessage = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const Footer = styled.footer`
  background: #000000;
  color: #ffffff;
  font-size: 13px;
  text-align: center;
  padding: 24px 12px;
`;
