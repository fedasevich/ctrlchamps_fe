import { useState } from 'react';
import HealthQuestionnaire from 'src/components/health-questionnaire';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { useLocales } from 'src/locales';
import CancelAppointmentModal from 'src/components/modal-cancel-appointment/CancelAppointmentModal';

export default function HealthQuestionnairePage(): JSX.Element {
  const { translate } = useLocales();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => setModalOpen(true);

  return (
    <div>
      <FlowHeader
        text="Activities of Daily Living Assessment"
        iconType="close"
        callback={handleOpen}
      />
      <HealthQuestionnaire />
    </div>
  );
}
