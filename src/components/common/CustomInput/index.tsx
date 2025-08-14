// import { inter } from '@/fonts';
// import { Box, InputGroup, Text } from '@chakra-ui/react';
// import React, { useState } from 'react';
// import './input.css';
// import getCountryCodeValue from '@/components/sections/Waitlist/controller/getCountryCodeValue';
// import getBorderColor from '@/utils/getBorderColor';

// interface Country {
//   flag: string;
//   idd: string;
// }

// type InputValue = string | number;

// interface CustomInputProp {
//   label: string;
//   id: string;
//   placeholder: string;
//   type?: 'text' | 'email' | 'tel' | 'select' | 'text-area';
//   isInvalid?: boolean;
//   errorMessage?: string;
//   value: InputValue;
//   onChange: (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => void;
//   setOpenCountryModal?: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedCountry?: Country;
//   setIsInputInvalid?: React.Dispatch<
//     React.SetStateAction<Record<string, boolean>>
//   >;
//   isLoading: boolean;
//   options?: { title: string; key: string }[];
// }

// const CustomInput = ({
//   label,
//   id,
//   placeholder,
//   type = 'text',
//   onChange,
//   setOpenCountryModal,
//   isInvalid,
//   errorMessage,
//   selectedCountry,
//   setIsInputInvalid,
//   isLoading,
//   options,
//   value,
// }: CustomInputProp) => {
//   const [telInputActive, setTelInputActive] = useState(false);

//   const handleBlur = () => {
//     setTelInputActive(false);
//     if (setIsInputInvalid) {
//       setIsInputInvalid((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleGenericBlur = () => {
//     if (setIsInputInvalid) {
//       setIsInputInvalid((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   return (
//     <InputGroup
//       display="flex"
//       flexDir="column"
//       gap={2}
//       fontFamily={inter.style.fontFamily}
//       zIndex={0}
//     >
//       <Text as="label" htmlFor={id}>
//         {label}
//       </Text>

//       {type === 'tel' && selectedCountry && (
//         <>
//           <Box
//             bgColor="white"
//             display="flex"
//             alignItems="center"
//             boxSizing="border-box"
//             rounded="16px"
//             border={getBorderColor(isInvalid, telInputActive)}
//             transition="all 0.1s ease-in-out"
//             _hover={{
//               border: isInvalid ? '1px solid #dc143c' : '1px solid #C8C8C8',
//             }}
//             padding={2}
//           >
//             <button
//               type="button"
//               onClick={() => {
//                 if (!isLoading && setOpenCountryModal) {
//                   setOpenCountryModal(true);
//                 }
//               }}
//               style={{
//                 fontSize: '24px',
//                 outline: 'none',
//                 display: 'flex',
//                 alignItems: 'center',
//                 backgroundColor: 'white',
//                 borderRadius: '16px',
//                 cursor: isLoading ? 'not-allowed' : 'pointer',
//               }}
//             >
//               {selectedCountry.flag}
//               <Text fontSize="14px">
//                 {getCountryCodeValue(selectedCountry.idd)}
//               </Text>
//             </button>
//             <input
//               id={id}
//               name={id}
//               value={value}
//               placeholder={placeholder}
//               style={{
//                 marginLeft: '8px',
//                 outline: 'none',
//                 width: '100%',
//                 backgroundColor: 'transparent',
//                 transition: 'border-width 0.3s',
//               }}
//               className="custom-tel-input"
//               onFocus={() => setTelInputActive(true)}
//               onBlur={handleBlur}
//               type={type}
//               onChange={onChange}
//               readOnly={isLoading}
//             />
//           </Box>
//           {isInvalid && (
//             <Text fontSize="12px" color="#dc143c">
//               {errorMessage}
//             </Text>
//           )}
//         </>
//       )}

//       {['text', 'email'].includes(type) && (
//         <Box>
//           <input
//             className={`custom-text-input ${
//               isInvalid ? 'error-text-input-border' : 'text-input-border'
//             }`}
//             style={{
//               transition: 'all 0.1s ease-in-out',
//               width: '100%',
//             }}
//             id={id}
//             name={id}
//             placeholder={placeholder}
//             type={type}
//             value={value}
//             onChange={onChange}
//             onBlur={handleGenericBlur}
//             readOnly={isLoading}
//           />
//           {isInvalid && (
//             <Text fontSize="12px" color="#dc143c">
//               {errorMessage}
//             </Text>
//           )}
//         </Box>
//       )}

//       {type === 'select' && (
//         <Box>
//           <select
//             className={`custom-text-input ${
//               isInvalid ? 'error-text-input-border' : 'text-input-border'
//             }`}
//             style={{
//               transition: 'all 0.1s ease-in-out',
//               width: '100%',
//             }}
//             id={id}
//             name={id}
//             disabled={isLoading}
//             onChange={onChange}
//             value={value}
//             onBlur={handleGenericBlur}
//           >
//             {options?.map((item) => (
//               <option key={item.key} value={item.key}>
//                 {item.title}
//               </option>
//             ))}
//           </select>
//           {isInvalid && (
//             <Text fontSize="12px" color="#dc143c">
//               {errorMessage}
//             </Text>
//           )}
//         </Box>
//       )}

//       {type === 'text-area' && (
//         <Box>
//           <textarea
//             className={`custom-text-input ${
//               isInvalid ? 'error-text-input-border' : 'text-input-border'
//             }`}
//             style={{
//               transition: 'all 0.1s ease-in-out',
//               width: '100%',
//             }}
//             id={id}
//             name={id}
//             value={value}
//             placeholder={placeholder}
//             onChange={onChange}
//             onBlur={handleGenericBlur}
//             readOnly={isLoading}
//           />
//           {isInvalid && (
//             <Text fontSize="12px" color="#dc143c">
//               {errorMessage}
//             </Text>
//           )}
//         </Box>
//       )}
//     </InputGroup>
//   );
// };

// export default CustomInput;

import { inter } from '@/fonts';
import { Box, InputGroup, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import './input.css';
import getCountryCodeValue from '@/components/sections/Waitlist/controller/getCountryCodeValue';
import getBorderColor from '@/utils/getBorderColor';
import { Country } from '@/components/sections/Waitlist/CountryModal';

// interface Country {
//   flag: string;
//   idd: {
//     root?: string;
//     suffixes?: string[];
//   };
// }

type InputInvalidState = {
  full_name: boolean;
  phone_number: boolean;
  email: boolean;
  farm_size: boolean;
};

interface CustomInputProp {
  label: string;
  id: string;
  placeholder: string;
  type?: 'text' | 'email' | 'tel' | 'select' | 'text-area';
  isInvalid?: boolean;
  errorMessage?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  setOpenCountryModal?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry?: Country;
  setIsInputInvalid?: React.Dispatch<React.SetStateAction<InputInvalidState>>;
  isLoading: boolean;
  options?: { title: string; key: string }[];
}

const CustomInput: React.FC<CustomInputProp> = ({
  label,
  id,
  placeholder,
  type = 'text',
  onChange,
  setOpenCountryModal,
  isInvalid,
  errorMessage,
  selectedCountry,
  setIsInputInvalid,
  isLoading,
  options,
  value,
}) => {
  const [telInputActive, setTelInputActive] = useState(false);

  const handleBlur = () => {
    if (setIsInputInvalid) {
      setIsInputInvalid((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <InputGroup
      display="flex"
      flexDir="column"
      gap={2}
      fontFamily={inter.style.fontFamily}
      zIndex={0}
    >
      <Text as="label" htmlFor={id}>
        {label}
      </Text>

      {/* Telephone Input */}
      {type === 'tel' && selectedCountry && (
        <>
          <Box
            bgColor="white"
            display="flex"
            alignItems="center"
            boxSizing="border-box"
            rounded="16px"
            border={getBorderColor(isInvalid, telInputActive)}
            transition="all 0.1s ease-in-out"
            _hover={{
              border: isInvalid ? '1px solid #dc143c' : '1px solid #C8C8C8',
            }}
            padding={2}
          >
            <button
              type="button"
              onClick={() => {
                if (!isLoading && setOpenCountryModal) {
                  setOpenCountryModal(true);
                }
              }}
              style={{
                fontSize: '24px',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '16px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {selectedCountry.flag}
              <Text fontSize="14px">
                {getCountryCodeValue(selectedCountry.idd)}
              </Text>
            </button>
            <input
              id={id}
              name={id}
              value={value}
              placeholder={placeholder}
              style={{
                marginLeft: '8px',
                outline: 'none',
                width: '100%',
                backgroundColor: 'transparent',
                transition: 'border-width 0.3s',
              }}
              className="custom-tel-input"
              onFocus={() => setTelInputActive(true)}
              onBlur={() => {
                setTelInputActive(false);
                handleBlur();
              }}
              type={type}
              onChange={onChange}
              readOnly={isLoading}
            />
          </Box>
          {isInvalid && (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          )}
        </>
      )}

      {/* Text / Email Input */}
      {['text', 'email'].includes(type) && (
        <Box>
          <input
            className={`custom-text-input ${
              isInvalid ? 'error-text-input-border' : 'text-input-border'
            }`}
            style={{
              transition: 'all 0.1s ease-in-out',
              width: '100%',
            }}
            id={id}
            name={id}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            readOnly={isLoading}
          />
          {isInvalid && (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          )}
        </Box>
      )}

      {/* Select Input */}
      {type === 'select' && (
        <Box>
          <select
            className={`custom-text-input ${
              isInvalid ? 'error-text-input-border' : 'text-input-border'
            }`}
            style={{
              transition: 'all 0.1s ease-in-out',
              width: '100%',
            }}
            id={id}
            name={id}
            disabled={isLoading}
            onChange={onChange}
            value={value}
            onBlur={handleBlur}
          >
            {options?.map((item) => (
              <option key={item.key} value={item.key}>
                {item.title}
              </option>
            ))}
          </select>
          {isInvalid && (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          )}
        </Box>
      )}

      {/* Text Area */}
      {type === 'text-area' && (
        <Box>
          <textarea
            className={`custom-text-input ${
              isInvalid ? 'error-text-input-border' : 'text-input-border'
            }`}
            style={{
              transition: 'all 0.1s ease-in-out',
              width: '100%',
            }}
            id={id}
            name={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={handleBlur}
            readOnly={isLoading}
          />
          {isInvalid && (
            <Text fontSize="12px" color="#dc143c">
              {errorMessage}
            </Text>
          )}
        </Box>
      )}
    </InputGroup>
  );
};

export default CustomInput;
