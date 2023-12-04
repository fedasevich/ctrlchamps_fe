import { useState } from 'react';
import HealthQuestionnaire from 'src/components/health-questionnaire';
import { CancelAppointmentModal } from 'src/components/modal-cancel-appointment/CancelAppointmentModal';
import FlowHeader from 'src/components/reusable/header/FlowHeader';
import { useLocales } from 'src/locales';

export default function HealthQuestionnairePage(): JSX.Element {
  const { translate } = useLocales();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpen = (): void => setModalOpen(true);

  return (
    <div>
      <FlowHeader
        text={translate('health_questionnaire.header_text')}
        iconType="close"
        callback={handleOpen}
        showIcon
      />
      <HealthQuestionnaire onNext={() => undefined} />
      <CancelAppointmentModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
}
