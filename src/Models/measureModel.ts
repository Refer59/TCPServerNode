import mongoose from "mongoose";

interface IMeasure {
    value: number
    unit: string
    timestamp: Date
}

const measureSchema = new mongoose.Schema<IMeasure>({
    value: {
        type: Number,
        required: [true, 'Proporcione el valor de la medicion']
    },
    unit: {
        type: String,
        required: [true, 'Proporcione la unidad de medida de la medicion']
    },
    timestamp: {
        type: Date,
        default: () => new Date(),
        set: () => new Date(),
        immutable: true
    }
})

const Measure = mongoose.model('Measures', measureSchema)
export default Measure
