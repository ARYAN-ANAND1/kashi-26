// import React from 'react'
// import { EmblaOptionsType } from 'embla-carousel'
// import { DotButton, useDotButton } from './EmblaCarouselDotButton'
// import {
//   PrevButton,
//   NextButton,
//   usePrevNextButtons
// } from './EnmblaCarouselArrowButtons'
// import useEmblaCarousel from 'embla-carousel-react'
// import Card from './Card'

// type PropType = {
//   slides: number[]
//   options?: EmblaOptionsType
// }

// const EmblaCarousel: React.FC<PropType> = (props) => {
//   const { slides, options } = props
//   const [emblaRef, emblaApi] = useEmblaCarousel(options)

//   const { selectedIndex, scrollSnaps, onDotButtonClick } =
//     useDotButton(emblaApi)

//   const {
//     prevBtnDisabled,
//     nextBtnDisabled,
//     onPrevButtonClick,
//     onNextButtonClick
//   } = usePrevNextButtons(emblaApi)

//   return (
//     <section className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {slides.map((_, slideIndex) => (
//             <div 
//               className="embla__slide flex flex-wrap justify-around items-center gap-4 w-full px-4" 
//               key={slideIndex}
//             >
//               {/* Calculate the starting index for each slide */}
//               <div className="w-full sm:w-[calc(50%-0.5rem)] md2:w-[calc(33.333%-1rem)] lg2:w-[calc(25%-1rem)]
//                              max-w-[300px] min-w-[280px]">
//                 <Card imageUrl='' clockwise={true} index={slideIndex * 4} />
//               </div>
//               <div className="hidden sm:block sm:w-[calc(50%-0.5rem)] md2:w-[calc(33.333%-1rem)] lg2:w-[calc(25%-1rem)]
//                              max-w-[300px] min-w-[280px]">
//                 <Card imageUrl='' clockwise={false} index={slideIndex * 4 + 1} />
//               </div>
//               <div className="hidden md2:block md2:w-[calc(33.333%-1rem)] lg2:w-[calc(25%-1rem)]
//                              max-w-[300px] min-w-[280px]">
//                 <Card imageUrl='' clockwise={true} index={slideIndex * 4 + 2} />
//               </div>
//               <div className="hidden lg2:block lg2:w-[calc(25%-1rem)]
//                              max-w-[300px] min-w-[280px]">
//                 <Card imageUrl='' clockwise={false} index={slideIndex * 4 + 3} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="embla__controls">
//         <div className="embla__buttons">
//           <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
//           <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
//         </div>

//         <div className="embla__dots">
//           {scrollSnaps.map((_, index) => (
//             <DotButton
//               key={index}
//               onClick={() => onDotButtonClick(index)}
//               className={'embla__dot'.concat(
//                 index === selectedIndex ? ' embla__dot--selected' : ''
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default EmblaCarousel
