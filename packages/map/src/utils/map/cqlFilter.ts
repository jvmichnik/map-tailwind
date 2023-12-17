import { CqlFilter } from "components/Organismos/Map/Context/LayersContext";

export function convertToCqlString(cqlFilter: CqlFilter[] | undefined) {
  if (cqlFilter && cqlFilter.length > 0) {
    return cqlFilter
      .map((f) => {
        if (f.propertyType == "string") {
          return `strToLowerCase(${f.key}) like '%${f.value.toLowerCase()}%'`;
        }
        return `${f.key} in (${f.value.split(";").join(",")})`;
      })
      .join(" and ");
  }
  return "1=1";
}
