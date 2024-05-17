import {
    ProviderSocialMediaEnum,
    ProviderTypeEnum,
} from "@/schema/service-provider.schema";

export const providerTypes = [
    {
        label: "Test Preparation Center",
        value: ProviderTypeEnum.CONSULTANCY,
    },
    {
        label: "Private Tutor",
        value: ProviderTypeEnum.PRIVATE_TUTOR,
    },
];

export const socialMediaTypes = [
    {
        label: "Facebook",
        value: ProviderSocialMediaEnum.FACEBOOK,
    },
    {
        label: "Instagram",
        value: ProviderSocialMediaEnum.INSTAGRAM,
    },
    {
        label: "Youtube",
        value: ProviderSocialMediaEnum.YOUTUBE,
    },
];
