import { Form, Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

const PrimarySearch = () => {
    const [searchForm] = Form.useForm();

    return (
        <Form form={searchForm}>
            <Input
                placeholder="Search..."
                className="rounded-md"
                prefix={<IoSearchOutline className="text-gray-700 w-full" />}
            />
        </Form>
    );
};

export default PrimarySearch;
