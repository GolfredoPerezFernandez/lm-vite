import {
  Link,
     useLoaderData,
  } from "@remix-run/react";
  
  import CTA from '~/components/CTA';
  import { experiences, skills } from "../constants/index";
  
  import type { DataFunctionArgs } from "@remix-run/node";
import 'react-vertical-timeline-component/style.min.css';
import { projects } from "../constants";
import { arrow } from "../assets/icons";

  export async function loader({ request, params }: DataFunctionArgs) {
   
    return null;
  }
  
  export default function About() {
  
    return (
        <section className='pb-60 overflow-y-auto max-container '>
          <h1 className='head-text' >
            Hello, I'm{" "}
            <span className='blue-gradient_text font-semibold drop-shadow'>
              {" "}
              Golfredo
            </span>{" "}
            👋
          </h1>
    
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p>
              Software Engineer based in Croatia, specializing in technical
              education through hands-on learning and building applications.
            </p>
          </div>
    
          <div className='py-10 flex flex-col'>
            <h3 className='subhead-text'>My Skills</h3>
    
            <div className='mt-16 flex flex-wrap gap-12'>
              {skills.map((skill) => (
                <div className='block-container w-20 h-20' key={skill.name}>
                  <div className='btn-back rounded-xl' />
                  <div className='btn-front rounded-xl flex justify-center items-center'>
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className='w-1/2 h-1/2 object-contain'
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          <div className='py-16'>
            <h3 className='subhead-text'>Work Experience.</h3>
            <div className='mt-5 flex flex-col gap-3 text-slate-500'>
              <p>
                I've worked with all sorts of companies, leveling up my skills and
                teaming up with smart people. Here's the rundown:
              </p>
            </div>
    
            <h1 className='head-text'>
        My{" "}
        <span className='blue-gradient_text drop-shadow font-semibold'>
          Projects
        </span>
      </h1>

      <p className='text-slate-500 mt-2 leading-relaxed'>
        I've embarked on numerous projects throughout the years, but these are
        the ones I hold closest to my heart. Many of them are open-source, so if
        you come across something that piques your interest, feel free to
        explore the codebase and contribute your ideas for further enhancements.
        Your collaboration is highly valued!
      </p>

      <div className='flex flex-wrap my-20 gap-16'>
        {projects.map((project) => (
          <div className='lg:w-[400px] w-full' key={project.name}>
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme}`} />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                  src={project.iconUrl}
                  alt='threads'
                  className='w-1/2 h-1/2 object-contain'
                />
              </div>
            </div>

            <div className='mt-5 flex flex-col'>
              <h4 className='text-2xl font-poppins font-semibold'>
                {project.name}
              </h4>
              <p className='mt-2 text-slate-500'>{project.description}</p>
              <div className='mt-5 flex items-center gap-2 font-poppins'>
                <Link
                  to={project.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-semibold text-blue-600'
                >
                  Live Link
                </Link>
                <img
                  src={arrow}
                  alt='arrow'
                  className='w-4 h-4 object-contain'
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className='border-slate-200' />

      <CTA />
            </div>
    
          <hr className='border-slate-300' />
        
        </section>
    );
  }
  