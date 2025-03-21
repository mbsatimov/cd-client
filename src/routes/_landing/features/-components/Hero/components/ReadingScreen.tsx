import React from 'react';

import type { FormBuilderValue } from '@/components/FormBuilderPreview/types';

import { EditorPreview } from '@/components/editor';
import { FormBuilder } from '@/components/FormBuilderPreview';
import { Highlightable } from '@/components/Highlightable';
import { BaseLayout } from '@/components/layout';

const passage =
  '<p><span style="font-size: 16px"><strong>READING PASSAGE 2</strong></span></p><p><em>You should spend about 20 minutes on </em><strong><em>Questions 14-26</em></strong><em>, which are based on Reading Passage 2 below.</em></p><p></p><h1 style="text-align: center">Forest management in Pennsylvania, USA</h1><p></p><p style="text-align: center"><em>How managing low-quality wood (also known as low-use wood ) for bioenergy can encourage sustainable forest management</em></p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>A</strong></span> tree’s ‘value’ depends on several factors including its species, size, form, condition, quality, function, and accessibility, and depends on the management goals for a given forest. The same tree can be valued very differently by each person who looks at it. A large, straight black cherry tree has high value as timber to be cut into logs or made into furniture, but for a landowner more interested in wildlife habitat, the real value of that stem (or trunk) may be the food it provides to animals. Likewise, if the tree suffers from black knot disease, its value for timber decreases, but to a woodworker interested in making bowls, it brings an opportunity for a unique and beautiful piece of art.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>B</strong></span> In the past, Pennsylvania landowners were solely interested in the value of their trees as high-quality timber. The norm was to remove the stems of highest quality and leave behind poorly formed trees that were not as well suited to the site where they grew. This practice, called ‘high-grading’, has left a legacy of ‘low-use wood’ in the forests. Some people even call these ‘junk trees’, and they are abundant in Pennsylvania. These trees have lower economic value for traditional timber markets, compete for growth with higher-value trees, shade out desirable regeneration and decrease the health of a stand leaving it more vulnerable to poor weather and disease. Management that specifically targets low-use wood can help landowners manage these forest health issues, and wood energy markets help promote this.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>C</strong></span> Wood energy markets can accept less expensive wood material of lower quality than would be suitable for traditional timber markets. Most wood used for energy in Pennsylvania is used to produce heat or electricity through combustion. Many schools and hospitals use wood boiler systems to heat and power their facilities, many homes are primarily heated with wood, and some coal plants incorporate wood into their coal streams to produce electricity. Wood can also be gasified for electrical generation and can even be made into liquid fuels like ethanol and gasoline for lorries and cars. All these products are made primarily from low-use wood. Several tree- and plant-cutting approaches, which could greatly improve the long-term quality of a forest, focus strongly or solely on the use of wood for those markets.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>D</strong></span> One such approach is called a Timber Stand Improvement (TSI) Cut. In a TSI Cut, really poor-quality tree and plant material is cut down to allow more space, light, and other resources to the highest-valued stems that remain. Removing invasive plants might be another primary goal of a TSI Cut. The stems that are left behind might then grow in size and develop more foliage and larger crowns or tops that produce more coverage for wildlife; they have a better chance to regenerate in a less crowded environment. TSI Cuts can be tailored to one farmer ’s specific management goals for his or her land.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>E</strong></span> Another approach that might yield a high amount of low-use wood is a Salvage Cut. With the many pests and pathogens visiting forests including hemlock wooly adelgid, Asian longhomed beetle, emerald ash borer, and gypsy moth, to name just a few, it is important to remember that those working in the forests can help ease these issues through cutting procedures. These types of cut reduce the number of sick trees and seek to manage the future spread of a pest problem. They leave vigorous trees that have stayed healthy enough to survive the outbreak.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>F</strong></span> A Shelterwood Cut, which only takes place in a mature forest that has already been thinned several times, involves removing all the mature trees when other seedlings have become established. This then allows the forester to decide which tree species are regenerated. It leaves a young forest where all trees are at a similar point in their growth. It can also be used to develop a two-tier forest so that there are two harvests and the money that comes in is spread out over a decade or more.</p><p style="text-align: left"></p><p style="text-align: left"><span style="font-size: 20px"><strong>G </strong></span>Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood. However, it is important to remember that some retention of what many would classify as low-use wood is very important. The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil. In addition, trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals. They help control problem insects and increase the health and resilience of the forest. It is also important to remember that not all small trees are low-use. For example, many species like hawthorn provide food for wildlife. Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity.</p>';

const questions: FormBuilderValue[] = [
  {
    id: '9216e07a-0d7f-4c11-bcda-a9a6af997500',
    type: 'selection',
    title: null,
    condition:
      'Reading Passage 2 has seven paragraphs, A-G.\n\nWhich paragraph contains the following information?\n\nWrite the correct letter, A-G, in boxes 14 18 on your answer sheet.\n\nNB You may use any letter more than once.',
    showOptions: false,
    content:
      '<p>14 bad outcomes for a forest when people focus only on its financial reward @@</p><p>15 reference to the aspects of any tree that contribute to its worth @@</p><p>16 mention of the potential use of wood to help run vehicles @@</p><p>17 examples of insects that attack trees @@</p><p>18 an alternative name for trees that produce low-use wood @@</p>',
    options: [
      {
        id: 'a665d62c-d9dd-441f-9d2d-d18f97198777',
        value: 'A',
        label: ''
      },
      {
        id: '81ac396e-36d5-4050-bda4-40321072b3c0',
        value: 'B',
        label: ''
      },
      {
        id: '22ee7071-7fb3-4924-9723-80d2c468a4f3',
        value: 'C',
        label: ''
      },
      {
        id: 'fd78c722-9628-4c8d-8e91-b87d933d8032',
        value: 'D',
        label: ''
      },
      {
        id: '28ced730-3edf-43f5-bbe2-ccfe96c083ee',
        value: 'E',
        label: ''
      },
      {
        id: '5ab81154-b898-4347-8d1d-4c1899dc72a8',
        value: 'F',
        label: ''
      },
      {
        id: '923edc19-aa75-4dba-91f7-8da6ff3b3c0f',
        value: 'G',
        label: ''
      }
    ]
  },
  {
    id: '784e6c4d-4ce3-4626-8810-b6001b87a10b',
    type: 'selection',
    title: 'List of Timber Cuts',
    condition:
      'Look at the following purposes (Questions 19-21) and the list of timber cuts below.\n\nMatch each purpose with the correct timber cut, A, B or C.\n\nWrite the correct letter, A, B or C, in boxes 19-21 on your answer sheet.\n\nNB You may use any letter more than once.',
    showOptions: true,
    content:
      '<ol start="19"><li><p>to remove trees that are diseased @@</p></li><li><p>to generate income across a number of years @@</p></li><li><p>to create a forest whose trees are close in age @@</p></li></ol><p></p>',
    options: [
      {
        id: '8a7a925a-d3bb-4655-8654-27093f566724',
        value: 'A',
        label: 'a TSI Cut'
      },
      {
        id: '3d93a947-7df6-4218-9071-88892fd91d35',
        value: 'B',
        label: 'a Salvage Cut'
      },
      {
        id: '42809fd4-675d-493f-8a16-708ebb694428',
        value: 'C',
        label: 'a Shelterwood Cut'
      }
    ]
  },
  {
    id: '732d128a-9d1b-4934-ab0c-d15cbbfbb179',
    type: 'completion',
    content:
      '<ol start="22"><li><p>Some dead wood is removed to avoid the possibility of @@.</p></li><li><p>The @@ from the tops of cut trees can help improve soil quality.</p></li><li><p>Some damaged trees should be left, as their @@ provide habitats for a range of creatures..</p></li><li><p>Some trees that are small, such as @@ , are a source of food for animals and insects.</p></li><li><p>Any trees that are @@ should be left to grow, as they add to the variety of species in the forest.</p></li></ol><p></p>',
    title: null,
    condition:
      'Complete the sentences below.\n\nChoose ONE WORD ONLY from the passage for each answer.\n\nWrite your answers in boxes 22-26 on your answer sheet.'
  }
];

export const ReadingScreen = () => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const setAnswer = (index: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: answer
    }));
  };

  return (
    <Highlightable>
      <div className='h-[min(80vh,900px)] overflow-y-auto'>
        <div className='grid h-full divide-y md:grid-cols-2 md:divide-x'>
          <BaseLayout className='overflow-y-auto'>
            <EditorPreview>
              <div dangerouslySetInnerHTML={{ __html: passage }} />
            </EditorPreview>
          </BaseLayout>
          <BaseLayout className='overflow-y-auto'>
            <FormBuilder answers={answers} setAnswer={setAnswer} questions={questions} />
          </BaseLayout>
        </div>
      </div>
    </Highlightable>
  );
};
