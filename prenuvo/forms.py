
head_vocab = {'Locations': ['Front', 'Back', 'Left side', 'Right side']}
eye_vocab = {'Locations': ['Left eye', 'Right eye']}
ear_vocab = {'Locations': ['Left ear', 'Right ear']}

extremity_vocab = {
    'Locations': ['Left hand', 'Right hand', 'Left foot', 'Right foot'],
}
leg_vocab = {
    'Locations': ['Left leg', 'Right leg'],
}

symptom_form = {
    'fields': [
        {
            'title': 'General Symptoms',
            'label':
                'Check any of the following symptoms that you are or have recently experienced',
            'choices': ['Recent weight gain', 'Recent weight loss'],
            'type': 'checkbox',
        },
        {
            'title': 'Head Symptoms',
            'label':
                'Check any of the following head symptoms that you are or have recently experienced',
            'choices': [
                'Frequent headaches',
                'Frequent migraines',
                'Head injuries or concussion',
                'Eye pain',
                'Earache or ear drainage',
                'Ringing in the ears',
                'Hearing loss',
            ],
            'type': 'checkbox',
            'children': [
                {
                    'title': 'Frequency',
                    'label': 'How often do you experience this symptom? ',
                    'choices': ['Daily', '2-3 times/week', 'Weekly', 'Less frequent'],
                    'type': 'radio',
                },
                {
                    'title': 'Locations',
                    'label': 'Where is the most frequent location(s) of your symptom?',
                    'choices': ['Front', 'Back', 'Left side', 'Right side'],
                    'type': 'checkbox',
                },
            ],
        },
        {
            'title': 'Cardiovascular symptoms',
            'label':
                'Check any of the following symptoms that you are or have recently experienced',
            'choices': [
                'Rapid heartbeat',
                'Irregular heartbeat (palpitations)',
                'Shortness of breath on lying flat in bed',
                'Heart murmur',
                'Shortness of breath without exercise',
                'Pale skin',
                'High cholesterol',
                'Heart disease',
                'Frequent fainting or blackouts',
                'Shortness of breath with exercise',
                'High blood pressure',
                'Chest discomfort',
                'Unexplained weakness',
            ],
            'type': 'checkbox',
        },
        {
            'title': 'Symptoms in the extremeties',
            'label':
                'Check any of the following symptoms that you are or have recently experienced',
            'choices': [
                'Tingling in hands or feet',
                'Shaking in hands or feet',
                'Skin turning blue in fingers or toes',
                'Pain in calves or thighs when walking',
                'Swelling in hands or feet',
            ],
            'type': 'checkbox',
            'children': [
                {
                    'title': 'Locations',
                    'label': 'Where is the most frequent location(s) of your symptom?',
                    'choices': ['Left hand', 'Right hand', 'Left foot', 'Right foot'],
                    'type': 'checkbox',
                },
            ],
        },
    ],
    'vocab': {
        'Frequent headaches': head_vocab,
        'Eye pain': eye_vocab,
        'Earache or ear drainage': ear_vocab,
        'Ringing in the ears': ear_vocab,
        'Pain in calves or thighs when walking': leg_vocab,
    },
}
