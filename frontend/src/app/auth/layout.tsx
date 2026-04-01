interface Props {
  children: React.ReactNode;
}

function layout({ children }: Props) {
  return <div className="p-6 lg:p-16">{children}</div>;
}

export default layout;
