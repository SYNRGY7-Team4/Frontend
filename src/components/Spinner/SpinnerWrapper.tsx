import Spinner from "./Spinner";

interface SpinnerWrapperProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function SpinnerWrapper({
  isLoading,
  children,
}: SpinnerWrapperProps) {
  return (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );
}
