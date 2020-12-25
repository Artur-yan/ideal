
export class FileUploadModel {

  public filePath: string | ArrayBuffer;
  public data: Blob;

  public errors = {
    file : false,
  };

  public uploadFile(files: Blob[]) {
    if (files && files[0]) {
      const READER = new FileReader();
      READER.readAsDataURL(files[0]);
      READER.onload = () => {
        this.filePath = READER.result;
        this.data = files[0];
      };
    }
  }

  validate(): boolean {
    let isValid = true;
    const ERRORS = {
      file : false,
    };

    if (!this.data && !this.filePath) {
      ERRORS.file = true;
      isValid = false;
    }

    this.errors = ERRORS;
    return isValid;
  }
}
