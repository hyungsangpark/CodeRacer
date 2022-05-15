import { render, screen } from "@testing-library/react";
import CustomButton from "../CustomButton";

describe("CustomButton", () => {
  it("display a custom button", () => {
    render(<CustomButton onClick={() => {}}>Test</CustomButton>);

    const linkElement = screen.getByText(/Test/i);

    expect(linkElement).toBeInTheDocument();
  });

  it("click a custom button to run onClick function.", () => {
    let hasBeenClicked = false;

    render(
      <CustomButton
        onClick={() => {
          hasBeenClicked = true;
        }}
      >
        Test
      </CustomButton>
    );

    const linkElement = screen.getByText(/Test/i);
    linkElement.click();

    expect(hasBeenClicked).toEqual(true);
    expect(linkElement).toBeInTheDocument();
  });
});
