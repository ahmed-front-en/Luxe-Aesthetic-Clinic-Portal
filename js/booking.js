document.addEventListener('DOMContentLoaded', () => {
  initBookingStepper();
});

function initBookingStepper() {
  const stepper = document.getElementById('booking-stepper');
  if (!stepper) return;

  const state = {
    currentStep: 1,
    totalSteps: 4,
    data: {
      treatment: null,
      specialist: null,
      date: null,
      details: null
    }
  };

  const stepPanels = stepper.querySelectorAll('.step-panel');
  const stepCircles = stepper.querySelectorAll('.stepper__circle');
  const stepLabels = stepper.querySelectorAll('.stepper__label');
  const nextButtons = stepper.querySelectorAll('.step-next');
  const prevButtons = stepper.querySelectorAll('.step-prev');
  const radioInputs = stepper.querySelectorAll('.radio-card__input');

  function goToStep(step) {
    if (step < 1 || step > state.totalSteps) return;

    state.currentStep = step;
    renderStep();
  }

  function renderStep() {
    stepPanels.forEach((panel, index) => {
      panel.classList.toggle('step-panel--active', index + 1 === state.currentStep);
    });

    stepCircles.forEach((circle, index) => {
      const stepNum = index + 1;
      circle.classList.remove('stepper__circle--active', 'stepper__circle--completed', 'stepper__circle--pending');

      if (stepNum === state.currentStep) {
        circle.classList.add('stepper__circle--active');
      } else if (stepNum < state.currentStep) {
        circle.classList.add('stepper__circle--completed');
      } else {
        circle.classList.add('stepper__circle--pending');
      }
    });

    stepLabels.forEach((label, index) => {
      const stepNum = index + 1;
      label.classList.remove('stepper__label--active', 'stepper__label--completed', 'stepper__label--pending');

      if (stepNum === state.currentStep) {
        label.classList.add('stepper__label--active');
      } else if (stepNum < state.currentStep) {
        label.classList.add('stepper__label--completed');
      } else {
        label.classList.add('stepper__label--pending');
      }
    });

    if (state.currentStep === state.totalSteps) {
      showSummary();
    }
  }

  function nextStep() {
    if (!validateCurrentStep()) return;

    if (state.currentStep < state.totalSteps) {
      goToStep(state.currentStep + 1);
    }
  }

  function prevStep() {
    if (state.currentStep > 1) {
      goToStep(state.currentStep - 1);
    }
  }

  function validateCurrentStep() {
    const currentPanel = stepPanels[state.currentStep - 1];
    if (!currentPanel) return false;

    const requiredInputs = currentPanel.querySelectorAll('[required]');
    for (const input of requiredInputs) {
      if (!input.value || (input.type === 'radio' && !currentPanel.querySelector('input[name="' + input.name + '"]:checked'))) {
        input.focus();
        return false;
      }
    }

    return true;
  }

  function showSummary() {
    const summaryContainer = document.getElementById('booking-summary');
    if (!summaryContainer) return;

    const treatmentLabel = document.querySelector('.radio-card__input:checked ~ .radio-card__label');
    const treatmentName = treatmentLabel ? treatmentLabel.textContent : 'Not selected';

    summaryContainer.innerHTML = `
      <div class="step-panel__title">Confirm Your Consultation</div>
      <div style="padding: var(--space-unit-lg); background-color: var(--color-surface-container-low); margin-bottom: var(--space-unit-lg);">
        <div style="margin-bottom: var(--space-unit-md);">
          <span style="font-size: var(--font-size-label-sm); letter-spacing: var(--tracking-label-sm); text-transform: uppercase; color: var(--color-secondary); display: block; margin-bottom: 4px;">Treatment</span>
          <span style="font-size: var(--font-size-body-lg); color: var(--color-on-surface);">${treatmentName}</span>
        </div>
        <div style="margin-bottom: var(--space-unit-md);">
          <span style="font-size: var(--font-size-label-sm); letter-spacing: var(--tracking-label-sm); text-transform: uppercase; color: var(--color-secondary); display: block; margin-bottom: 4px;">Specialist</span>
          <span style="font-size: var(--font-size-body-lg); color: var(--color-on-surface);">Senior Specialist</span>
        </div>
        <div style="margin-bottom: var(--space-unit-md);">
          <span style="font-size: var(--font-size-label-sm); letter-spacing: var(--tracking-label-sm); text-transform: uppercase; color: var(--color-secondary); display: block; margin-bottom: 4px;">Date & Time</span>
          <span style="font-size: var(--font-size-body-lg); color: var(--color-on-surface);">To be scheduled</span>
        </div>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: var(--space-unit-md);">
        <button type="button" class="btn-outline step-prev">Back</button>
        <button type="button" class="btn-primary" id="confirm-booking">Confirm Booking</button>
      </div>
    `;

    const confirmBtn = document.getElementById('confirm-booking');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const container = summaryContainer.closest('.booking-form') || summaryContainer.parentElement;
        container.innerHTML = `
          <div style="text-align: center; padding: var(--space-unit-xl) 0;">
            <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-primary); margin-bottom: var(--space-unit-md);">check_circle</span>
            <h3 style="font-family: var(--font-display); font-size: var(--font-size-headline-md); font-weight: var(--weight-headline); margin-bottom: var(--space-unit-sm);">Thank You</h3>
            <p style="color: var(--color-on-surface-variant);">Your consultation request has been received. We will contact you shortly.</p>
          </div>
        `;
      });
    }
  }

  nextButtons.forEach((btn) => {
    btn.addEventListener('click', nextStep);
  });

  prevButtons.forEach((btn) => {
    btn.addEventListener('click', prevStep);
  });

  radioInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const card = input.closest('.radio-card');
      if (!card) return;

      const siblings = card.parentElement.querySelectorAll('.radio-card');
      siblings.forEach((s) => s.classList.remove('radio-card--selected'));
      card.classList.add('radio-card--selected');
    });
  });

  goToStep(1);
}
