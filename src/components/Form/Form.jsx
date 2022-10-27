import { Component } from "react";
import { FormSt, Btn, Input, Label } from "./Form.styled";

export class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.reset();
    this.props.onSubmit(this.state.name, this.state.number);
  };

  handleChange = (event) => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <FormSt onSubmit={this.handleSubmit}>
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            value={this.state.name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            id="name"
          />
        </Label>

        <Label htmlFor="number">
          Number
          <Input
            type="tel"
            value={this.state.number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            id="number"
          />
        </Label>

        <br />
        <Btn type="submit">Add Contact</Btn>
      </FormSt>
    );
  }
}
