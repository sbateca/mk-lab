import { TableRowProps } from "../components/molecules/TableRow/Types"
import { ISample } from "../model/sample"

export const samplesToTableRowPropList = (samples: ISample[]): TableRowProps[] => {
    return samples.map((sample) => {
            return {
                cells: [
                    { text: sample.sampleCode, align: "left" },
                    { text: sample.client, align: "left" },
                    { text: sample.getSampleDate, align: "left" },
                    { text: sample.receptionDate, align: "left" },
                    { text: sample.analysisDate, align: "left" },
                    { text: sample.sampleLocation, align: "left" },
                    { text: sample.responsable, align: "left" }
            ]}
        })
    
}
