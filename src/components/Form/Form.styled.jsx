import styled from "@emotion/styled";

export const FormSt = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  margin-bottom: 10px;
`;

export const Input = styled.input`
  margin-left: 2px;
  width: 300px;
  height: 30px;

  ::placeholder {
    font-size: 15px;
  }
`;

export const Btn = styled.button`
  display: block;
  width: 200px;
  height: 40px;
  background-color: transparent;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
