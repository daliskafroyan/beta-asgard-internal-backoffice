import {
  BanknotesIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BugAntIcon,
  CalculatorIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HandThumbUpIcon,
  IdentificationIcon,
  MapIcon,
  PhoneIcon,
  UserGroupIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';

const iconMapper = (icon: string) => {
  switch (icon) {
    case 'fa-phone':
      return <PhoneIcon width={16} />;
    case 'fa-user':
      return <UserIcon width={16} />;
    case 'fa-user-secret':
      return <BriefcaseIcon width={16} />;
    case 'fa-bug':
      return <BugAntIcon width={16} />;
    case 'fa-list-alt':
      return <DocumentTextIcon width={16} />;
    case 'fa-address-book':
      return <BookOpenIcon width={16} />;
    case 'fa-calculator':
      return <CalculatorIcon width={16} />;
    case 'fa-money-bill-wave':
      return <BanknotesIcon width={16} />;
    case 'fa-tractor':
      return <WrenchScrewdriverIcon width={16} />;
    case 'fa-id-card':
      return <IdentificationIcon width={16} />;
    case 'fa-map':
      return <MapIcon width={16} />;
    case 'fa-cog':
      return <Cog6ToothIcon width={16} />;
    case 'fa-users':
      return <UserGroupIcon width={16} />;
    case 'fa-angellist':
      return <HandThumbUpIcon width={16} />;
    default:
      break;
  }
};

export default iconMapper;
