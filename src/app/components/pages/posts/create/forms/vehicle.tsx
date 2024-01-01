'use client';

import { useEffect } from "react";
import { PostCreateInputText, PostCreateSelectInput, PostCreateSelectInputSearchable } from "@/app/components/inputs/postCreateInput";
import { PostObj } from "@/classes/PostCategories";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { BodyType, VehicleObj } from "@/classes/Vehicle";

export const CreateVehiclePostForm = () => {
    const t = useLanguage();
    const { category, makeId, modelId, modelYear, bodyType, mileage, fuelType, setMakeId, setModelId, setModelYear, setBodyType, setMileage, setFuelType } = usePostCreateStore();
    const { vehicleMakes, vehicleModels, vehicleYears, setModels, setYears } = useVehicleStore(); // Global store

    useEffect(() => {
        if (Object.keys(vehicleModels).length > 0) return;

        fetch(`${process.env.defaultApiEndpoint}/api/vehicles/getAllModels`, {
            method: 'GET',
        }).then(async (res) => {
            const { data } = await res.json();
            setModels(data);
        }).catch((err) => console.log(err));

        fetch(`${process.env.defaultApiEndpoint}/api/vehicles/getAllYears`, {
            method: 'GET',
        }).then(async (res) => {
            const { data } = await res.json();
            setYears(data);
        }).catch((err) => console.log(err));
    }, []);

    const MakeOnChange = (newValue: string) => {
        setMakeId(Number(newValue));
        setModelId(null!);
    };

    const ModelOnChange = (newValue: string) => {
        setModelId(Number(newValue));
        setModelYear(null!);
    }

    return (
        <>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>Pagrindinė informacija</span>
                <span className={`text-placeholder_secondary`}>Atidžiai užpildykite privalomąją informaciją prieš sukurdami skelbimą</span>
            </div>
            <div className={`grid grid-cols-2 laptop:grid-cols-3 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <PostCreateInputText
                    label={t.vehicleInfo.objKeys.type}
                    isDisabled={true}
                    value={t.post.categories[PostObj.getLabelByIndex(category) as keyof typeof t.post.categories]}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.make}
                    value={makeId ? vehicleMakes.find(item => item.id === makeId)!.make : ``}
                    placeholder={`----`}
                    items={vehicleMakes.map((item) => ({ id: item.id.toString(), label: item.make }))}
                    setValue={MakeOnChange}
                    compareToId={false}
                />
                <PostCreateSelectInputSearchable
                    label={t.vehicleInfo.objKeys.model}
                    value={modelId ? modelId.toString() : ``}
                    placeholder={`----`}
                    items={makeId !== null ? Object.values(vehicleModels[makeId]).map((value) => ({ id: value.id.toString(), label: value.label })) : []}
                    setValue={(value) => setModelId(Number(value))}
                    isDisabled={makeId === null}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.year}
                    value={modelYear && modelId !== null ? modelYear.toString() : ``}
                    items={modelId !== null ? vehicleYears[makeId][vehicleModels[makeId][modelId].label.toLocaleLowerCase()].map((model) => ({ id: model.id.toString(), label: model.year.toString() })) : []}
                    setValue={(value) => setModelYear(Number(value))}
                    isDisabled={modelId === null}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.body_type}
                    value={bodyType !== null ? bodyType.toString() : ``}
                    items={Object.keys(VehicleObj.getAllBodyTypes()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.body_type[VehicleObj.getBodyTypeByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.body_type] }))}
                    setValue={(value) => setBodyType(Number(value))}
                />
                <PostCreateInputText
                    label={t.vehicleInfo.objKeys.mileage}
                    value={mileage ? mileage.toString() : ``}
                    setValue={(value) => setMileage(Number(value))}
                />
                <PostCreateSelectInput 
                    label={t.vehicleInfo.objKeys.fuel_type}
                    value={}
                />
            </div>
        </>
    );
}