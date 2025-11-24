import React, { useState, useEffect } from 'react';
import { InternshipTrack } from '@/types/internship.types';
import { FormLayout, ImageUpload } from '@/components/ui';

interface InternshipFormProps {
  initialData?: Partial<InternshipTrack>;
  onSave: (track: InternshipTrack) => void;
  onCancel: () => void;
}

export const InternshipForm: React.FC<InternshipFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<InternshipTrack>>({
    title: '',
    duration: '',
    mode: 'Online',
    skills: [],
    description: '',
    image: '',
    ...initialData
  });

  const [skillsString, setSkillsString] = useState('');
  const [overview, setOverview] = useState('');
  const [programFlowString, setProgramFlowString] = useState('');
  const [whatYoullLearnString, setWhatYoullLearnString] = useState('');
  const [programStructureString, setProgramStructureString] = useState('');
  const [whoShouldApplyString, setWhoShouldApplyString] = useState('');
  const [careerOutcomesString, setCareerOutcomesString] = useState('');

  useEffect(() => {
    setFormData({
      title: '',
      duration: '',
      mode: 'Online',
      skills: [],
      description: '',
      image: '',
      ...initialData
    });
    if (initialData?.skills) {
      setSkillsString(initialData.skills.join(', '));
    } else {
      setSkillsString('');
    }
    if (initialData?.overview) {
      setOverview(initialData.overview);
    } else {
      setOverview('');
    }
    if (initialData?.programFlow) {
      setProgramFlowString(initialData.programFlow.join('\n'));
    } else {
      setProgramFlowString('');
    }
    if (initialData?.whatYoullLearn) {
      setWhatYoullLearnString(initialData.whatYoullLearn.join('\n'));
    } else {
      setWhatYoullLearnString('');
    }
    if (initialData?.programStructure) {
      setProgramStructureString(initialData.programStructure.join('\n'));
    } else {
      setProgramStructureString('');
    }
    if (initialData?.whoShouldApply) {
      setWhoShouldApplyString(initialData.whoShouldApply.join('\n'));
    } else {
      setWhoShouldApplyString('');
    }
    if (initialData?.careerOutcomes) {
      setCareerOutcomesString(initialData.careerOutcomes.join('\n'));
    } else {
      setCareerOutcomesString('');
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsString(e.target.value);
  };

  const handleImageChange = (base64: string) => {
    setFormData((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const updatedTrack = {
        ...formData,
        skills: skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0),
        overview: overview.trim() || undefined,
        programFlow: programFlowString.split('\n').map(s => s.trim()).filter(s => s.length > 0).length > 0
          ? programFlowString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined,
        whatYoullLearn: whatYoullLearnString.split('\n').map(s => s.trim()).filter(s => s.length > 0).length > 0
          ? whatYoullLearnString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined,
        programStructure: programStructureString.split('\n').map(s => s.trim()).filter(s => s.length > 0).length > 0
          ? programStructureString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined,
        whoShouldApply: whoShouldApplyString.split('\n').map(s => s.trim()).filter(s => s.length > 0).length > 0
          ? whoShouldApplyString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined,
        careerOutcomes: careerOutcomesString.split('\n').map(s => s.trim()).filter(s => s.length > 0).length > 0
          ? careerOutcomesString.split('\n').map(s => s.trim()).filter(s => s.length > 0)
          : undefined
      } as InternshipTrack;
      onSave(updatedTrack);
    }
  };

  return (
    <FormLayout
      title={formData.id ? 'Edit Internship Track' : 'Create New Track'}
      isEdit={!!formData.id}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel="Save Internship"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="e.g. AI & Machine Learning"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.duration || ''}
              onChange={handleChange}
              placeholder="e.g. 2 Months"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select
              name="mode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.mode || 'Online'}
              onChange={handleChange}
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <ImageUpload
          value={formData.image}
          onChange={handleImageChange}
          id="internship-image-upload"
          replaceId="internship-image-upload-replace"
          label="Featured Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills (Comma separated)</label>
          <input
            type="text"
            value={skillsString}
            onChange={handleSkillsChange}
            placeholder="React, Node.js, TypeScript"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Brief description of the program..."
          />
        </div>

        {/* Detailed Information Section */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Information (for Detail Page)</h3>
          <p className="text-sm text-gray-600 mb-4">Fill these fields to customize the detail page. Each line in list fields will become a separate item.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Overview <span className="text-gray-500">(Detailed description)</span>
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Enter a comprehensive overview of the program..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Flow <span className="text-gray-500">(One item per line)</span>
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                value={programFlowString}
                onChange={(e) => setProgramFlowString(e.target.value)}
                placeholder="Week 1-2: Foundation and fundamentals&#10;Week 3-4: Intermediate concepts&#10;Week 5-6: Advanced topics&#10;Week 7-8: Capstone project"
              />
              <p className="text-xs text-gray-500 mt-1">Each line will become a separate phase in the program flow</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What You'll Learn <span className="text-gray-500">(One item per line)</span>
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                value={whatYoullLearnString}
                onChange={(e) => setWhatYoullLearnString(e.target.value)}
                placeholder="Build responsive web applications&#10;Create RESTful APIs&#10;Design database schemas&#10;Deploy to cloud platforms"
              />
              <p className="text-xs text-gray-500 mt-1">Each line will become a separate learning outcome</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Structure <span className="text-gray-500">(One item per line)</span>
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                value={programStructureString}
                onChange={(e) => setProgramStructureString(e.target.value)}
                placeholder="Live coding sessions&#10;Hands-on projects&#10;Mentorship and guidance&#10;Weekly assessments"
              />
              <p className="text-xs text-gray-500 mt-1">Each line will become a separate structure element</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Who Should Apply <span className="text-gray-500">(One item per line)</span>
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                value={whoShouldApplyString}
                onChange={(e) => setWhoShouldApplyString(e.target.value)}
                placeholder="Students and recent graduates&#10;Career switchers&#10;Professionals seeking skill enhancement&#10;Anyone passionate about learning"
              />
              <p className="text-xs text-gray-500 mt-1">Each line will become a separate target audience</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Career Outcomes <span className="text-gray-500">(One item per line)</span>
              </label>
              <textarea
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm"
                value={careerOutcomesString}
                onChange={(e) => setCareerOutcomesString(e.target.value)}
                placeholder="Software Developer positions&#10;Full Stack Developer roles&#10;Backend Developer opportunities&#10;Startup co-founder opportunities"
              />
              <p className="text-xs text-gray-500 mt-1">Each line will become a separate career outcome</p>
            </div>
          </div>
        </div>

    </FormLayout>
  );
};

export default InternshipForm;