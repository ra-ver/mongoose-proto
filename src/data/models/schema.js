import {
  Schema
} from 'mongoose';

export const CancerModelSchema = new Schema({
  name: {
    type: 'String',
    required: true,
    unique: true,
  },
  age_at_diagnosis: Number,
  age_at_sampling: Number,
  gender: String,
  race: String,
  model_image: String,
  model_type: String,
  histopathological_biomarkers: [String],
  sequencing_derived_somatic_variants: [String],
  cancer_related_somatic_mutations: [String],
  molecular_characterization: String,
  primary_site: String,
  sample_acquisition_site: String,
  histological_type: String,
  clinical_stage: String,
  tumor_histological_grade: String,
  pathological_tnm_stage: String,
  neoadjuvant_therapy: String,
  therapies: [String],
  list_of_chemo_drugs_available: String,
  vital_status: String,
  disease_status_at_unlinking: String,
  model_growth_rate: Number,
  split_ratio: String,
  third_party_licensing_requirement: String,
  model_availability: Date,
}, {
  timestamps: true,
  collection: 'cancermodeles'
});
