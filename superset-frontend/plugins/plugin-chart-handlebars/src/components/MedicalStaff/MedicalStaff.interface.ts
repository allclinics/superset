import { TimeseriesDataRecord } from '@superset-ui/core';

export interface MedicalStaffProps {
  data: TimeseriesDataRecord[];
  isMedicalStaffOverview: boolean;
  isMedicalStaffScoresControl: boolean;
  isMedicalStaffPerformedProcedures: boolean;
}
