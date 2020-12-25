
export class HandledError {
  private readonly defaultErrorMessage = 'Something went wrong';
  text: string;

  constructor(text?: string) {
    this.text = text || this.defaultErrorMessage;
  }
}
