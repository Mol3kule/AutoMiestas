import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";

import { PostDescriptionSection, PostGeneralInformationSection, PostImagesSection, PostLocationSection } from "./post-view-wrapper";
import { PostCreateInputText, PostCreateSelectInput } from "@/components/inputs/postCreateInput";
import { PostObj } from "@/classes/PostCategories";
import { VehicleObj } from "@/classes/Vehicle";

export const ItemPostView = () => {
    return (
        <>
            <GeneralSection />
            <hr className={`w-full text-border bg-border`} />
            <PostDescriptionSection />
            <hr className={`w-full text-border bg-border`} />
            <PostImagesSection />
            <hr className={`w-full text-border bg-border`} />
            <PostLocationSection />
            <hr className={`w-full text-border bg-border`} />
        </>
    );
};

const GeneralSection = () => {
    const { category, title, partNumber, condition, price, setTitle, setPartNumber, setCondition, setPrice } = usePostCreateStore();
    const t = useLanguage();

    return (
        <PostGeneralInformationSection>
            <PostCreateInputText
                label={t.vehicleInfo.objKeys.type}
                isDisabled={true}
                value={t.post.categories[PostObj.getLabelByIndex(category) as keyof typeof t.post.categories]}
            />
            <PostCreateInputText
                label={`Pavadinimas`}
                value={title ?? ``}
                setValue={setTitle}
            />
            {category !== 8 && (
                <PostCreateInputText
                    label={`Originalios dalies numeris`}
                    value={partNumber ?? ``}
                    setValue={setPartNumber}
                />
            )}
            <PostCreateSelectInput
                label={t.vehicleInfo.objKeys.condition}
                value={condition !== null ? condition.toString() : ``}
                items={Object.keys(VehicleObj.getAllConditions()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.conditions[VehicleObj.getConditionByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.conditions] }))}
                setValue={(value) => setCondition(Number(value))}
            />
            <PostCreateInputText
                label={t.general.price}
                value={price ? price.toString() : ``}
                setValue={(value) => setPrice(Number(value))}
            />
        </PostGeneralInformationSection>
    );
};