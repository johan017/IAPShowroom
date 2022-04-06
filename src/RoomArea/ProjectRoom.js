import { useParams } from "react-router";
import useFetch from "../useFetch";
import {Link} from  "react-router-dom";


const ProjectRoom = () => {

    const {id} = useParams();
    const {data: project, error, isLoading} = useFetch('http://localhost:8000/projects/' + id); /* data is project because we want the id of a singular project */

    return (  
        <div className = "project-room">
            {isLoading && <div> Loading... </div>}
            {error && <div> {error} </div>}
            {project && (
                <article>
                    <p>
                    A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. 
                    This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.
                    Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or a single long illustration of a general point. It might describe a place, character, or process; narrate a series of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. 
                    Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most important of these is a topic sentence.
                    TOPIC SENTENCES
                    A well-organized paragraph supports or develops a single controlling idea, which is expressed in a sentence called the topic sentence. A topic sentence has several important functions: it substantiates or supports an essay’s thesis statement; it unifies the content of a paragraph and directs the order of the sentences; and it advises the reader of the subject to be discussed and how the paragraph will discuss it. Readers generally look to the first few sentences in a paragraph to determine the subject and perspective of the paragraph. That’s why it’s often best to put the topic sentence at the very beginning of the paragraph. In some cases, however, it’s more effective to place another sentence before the topic sentence—for example, a sentence linking the current paragraph to the previous one, or one providing background information.
                    Although most paragraphs should have a topic sentence, there are a few situations when a paragraph might not need a topic sentence. For example, you might be able to omit a topic sentence in a paragraph that narrates a series of events, if a paragraph continues developing an idea that you introduced (with a topic sentence) in the previous paragraph, or if all the sentences and details in a paragraph clearly refer—perhaps indirectly—to a main point. The vast majority of your paragraphs, however, should have a topic sentence.
                    PARAGRAPH STRUCTURE
                    Most paragraphs in an essay have a three-part structure—introduction, body, and conclusion. You can see this structure in paragraphs whether they are narrating, describing, comparing, contrasting, or analyzing information. Each part of the paragraph plays an important role in communicating your meaning to your reader.
                    Introduction: the first section of a paragraph; should include the topic sentence and any other sentences at the beginning of the paragraph that give background information or provide a transition.
                    Body: follows the introduction; discusses the controlling idea, using facts, arguments, analysis, examples, and other information.
                    Conclusion: the final section; summarizes the connections between the information discussed in the body of the paragraph and the paragraph’s controlling idea.
                    The following paragraph illustrates this pattern of organization. In this paragraph the topic sentence and concluding sentence (CAPITALIZED) both help the reader keep the paragraph’s main point in mind.
                    SCIENTISTS HAVE LEARNED TO SUPPLEMENT THE SENSE OF SIGHT IN NUMEROUS WAYS. In front of the tiny pupil of the eye they put, on Mount Palomar, a great monocle 200 inches in diameter, and with it see 2000 times farther into the depths of space. Or they look through a small pair of lenses arranged as a microscope into a drop of water or blood, and magnify by as much as 2000 diameters the living creatures there, many of which are among man’s most dangerous enemies. Or, if we want to see distant happenings on earth, they use some of the previously wasted electromagnetic waves to carry television images which they re-create as light by whipping tiny crystals on a screen with electrons in a vacuum. Or they can bring happenings of long ago and far away as colored motion pictures, by arranging silver atoms and color-absorbing molecules to force light waves into the patterns of original reality. Or if we want to see into the center of a steel casting or the chest of an injured child, they send the information on a beam of penetrating short-wave X rays, and then convert it back into images we can see on a screen or photograph. THUS ALMOST EVERY TYPE OF ELECTROMAGNETIC RADIATION YET DISCOVERED HAS BEEN USED TO EXTEND OUR SENSE OF SIGHT IN SOME WAY.
                    George Harrison, “Faith and the Scientist”
                    COHERENCE
                    In a coherent paragraph, each sentence relates clearly to the topic sentence or controlling idea, but there is more to coherence than this. If a paragraph is coherent, each sentence flows smoothly into the next without obvious shifts or jumps. A coherent paragraph also highlights the ties between old information and new information to make the structure of ideas or arguments clear to the reader.
                    Along with the smooth flow of sentences, a paragraph’s coherence may also be related to its length. If you have written a very long paragraph, one that fills a double-spaced typed page, for example, you should check it carefully to see if it should start a new paragraph where the original paragraph wanders from its controlling idea. On the other hand, if a paragraph is very short (only one or two sentences, perhaps), you may need to develop its controlling idea more thoroughly, or combine it with another paragraph.
                    A number of other techniques that you can use to establish coherence in paragraphs are described below.
                    Repeat key words or phrases. Particularly in paragraphs in which you define or identify an important idea or theory, be consistent in how you refer to it. This consistency and repetition will bind the paragraph together and help your reader understand your definition or description.     
                    Create parallel structures. Parallel structures are created by constructing two or more phrases or sentences that have the same grammatical structure and use the same parts of speech. By creating parallel structures you make your sentences clearer and easier to read. In addition, repeating a pattern in a series of consecutive sentences helps your reader see the connections between ideas. In the paragraph above about scientists and the sense of sight, several sentences in the body of the paragraph have been constructed in a parallel way. The parallel structures (which have been emphasized) help the reader see that the paragraph is organized as a set of examples of a general
                    </p>
                    <section id="project-room-info-section"></section>
                    <h2>{project.title}</h2>
                    <p> Wrritten by {project.author}</p>
                    <div>{project.abstract}</div>
                </article>
            )}
            <Link to ="/rooms">
                <button> Back to Rooms</button>
            </Link>
        </div>
    );
}
 
export default ProjectRoom;