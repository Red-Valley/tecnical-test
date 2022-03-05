interface GiphyDialogProps {
  search?: string;
  open: boolean;
  onClose: (gif: string) => void;
}
