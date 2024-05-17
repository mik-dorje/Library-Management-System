export enum ProviderTypeEnum {
    CONSULTANCY = "CONSULTANCY",
    PRIVATE_TUTOR = "PRIVATE_TUTOR",
}

export enum ProviderSocialMediaEnum {
    FACEBOOK = "FACEBOOK",
    INSTAGRAM = "INSTAGRAM",
    YOUTUBE = "YOUTUBE",
}

export interface IServiceProvider {
    id: number;
    name: string;
    about?: string | null;
    profile_picture: string;
    createdDate: string;
}

export interface IServiceProviderAddRequest {
    name: string;
    consultancyImage: string;
    consultancyType: ProviderTypeEnum;
    address: string;
    longitude?: string;
    latitude?: string;
    contact: string;
    email: string;
    about: string;
    frontendUrl?: string;
    backendUrl?: string;
    title?: string;
    seoDescription?: string;
    seoImage?: string;
    addedSocialMediaList?: ServiceProviderSocialMedia[];
    removedSocialMediaList?: ServiceProviderSocialMedia[];
    slug?: string;
    updatedProviderServices?: IProviderServiceSetRequestItem[];
}

export interface IServiceProviderUpdateRequest
    extends Omit<IServiceProviderAddRequest, "consultancyImage" | "seoImage"> {
    id: number;
    consultancyImage?: string;
    seoImage?: string;
}

export interface ServiceProviderSocialMedia {
    id?: number;
    link: string;
    socialMedia: ProviderSocialMediaEnum;
}

export interface IServiceProviderDetails {
    consultancy: {
        id: number;
        name: string;
        profilePicture: string;
        rating: number | null;
        voters: number | null;
        consultancyType: ProviderTypeEnum;
        slug: string | null;
        createdDate: string | null;
    };
    consultancyInfo: {
        address: string;
        contact: string;
        email: string;
        longitude: number | null;
        latitude: number | null;
        about: string;
        frontendUrl: string;
        backendUrl: string;
    };
    consultancySEO?: {
        id: number;
        title: string;
        description: string | null;
        image: string | null;
    };
    consultancyNetworks: {
        id: number;
        link: string;
        socialMedia: ProviderSocialMediaEnum;
    }[];
}

export interface IProviderServiceSetRequestItem {
    id?: number;
    name: string;
    rate: string;
    serviceReferenceId: number;
    consultancy: {
        id: number;
    };
}

export interface IProviderServiceCore {
    id: number;
    rate: string;
}

export interface IExistingProviderService extends IProviderServiceCore {
    name: string;
    serviceReferenceId: number;
    active: boolean;
}

export interface IUpdatedProviderService extends IProviderServiceCore {
    serviceName: string;
}
