interface IContentWrapperProps {
	children: React.ReactNode;
}

const ContentWrapper = ({ children }: IContentWrapperProps) => {
	return <div className="px-6 py-6">{children}</div>;
};

export default ContentWrapper;
