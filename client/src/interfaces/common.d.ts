export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  sx?: any;
  handleClick?: () => void;
}
export interface ProfileProps {
  type: string;
  loading: boolean;
  name: string;
  avatar: string;
  email: string;
  role: string;
  properties: Array | undefined;
}

export interface FormProps {
  type: string;
  register: any;
  formLoading: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  handleImageChange: (file) => void;
  onFinishHandler: (data: FieldValues) => Promise<void> | void;
  propertyImage: { name: string; url: string };
}
