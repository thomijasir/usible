import { For, type Component } from "solid-js";
import {
  ChevronLeftIcon,
  BellIcon,
  MenuIcon,
  EyeOffIcon,
  EyeOnIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
  HomeIcon,
  UserIcon,
  SettingsIcon,
  HelpIcon,
  DocumentIcon,
  MoonIcon,
  CashIcon,
  CreditCardIcon,
  GlobeIcon,
  ClickIcon,
  FingerprintIcon,
  BackspaceIcon,
  CheckIcon,
  ClockIcon,
  CalendarIcon,
  ChevronRightIcon,
  ImageErrorIcon,
  ChatIcon,
  ArrowNarrowLeftIcon,
  HeartIcon,
  CompassIcon,
  BedIcon,
  BathIcon,
  RulerIcon,
  MapPinFilledIcon,
  MapPinIcon,
  SparkleIcon,
  WhatsappIcon,
  WeChatIcon,
  ZaloIcon,
  LineIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  CodeIcon,
  ListBulletIcon,
  ListOrderedIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  TrashIcon,
  FilterIcon,
  PhotoUpIcon,
  InfoCircleIcon,
  ArrowBackIcon,
  WorldIcon,
  LockIcon,
  CalculatorIcon,
  ScaleIcon,
  BuildingStoreIcon,
  HomePlusIcon,
} from "~/assets/icons";

const icons = [
  { name: "ChevronLeftIcon", Icon: ChevronLeftIcon },
  { name: "BellIcon", Icon: BellIcon },
  { name: "MenuIcon", Icon: MenuIcon },
  { name: "EyeOffIcon", Icon: EyeOffIcon },
  { name: "EyeOnIcon", Icon: EyeOnIcon },
  { name: "SearchIcon", Icon: SearchIcon },
  { name: "ChevronDownIcon", Icon: ChevronDownIcon },
  { name: "ChevronUpIcon", Icon: ChevronUpIcon },
  { name: "StarIcon", Icon: StarIcon },
  { name: "HomeIcon", Icon: HomeIcon },
  { name: "UserIcon", Icon: UserIcon },
  { name: "SettingsIcon", Icon: SettingsIcon },
  { name: "HelpIcon", Icon: HelpIcon },
  { name: "DocumentIcon", Icon: DocumentIcon },
  { name: "MoonIcon", Icon: MoonIcon },
  { name: "CashIcon", Icon: CashIcon },
  { name: "CreditCardIcon", Icon: CreditCardIcon },
  { name: "GlobeIcon", Icon: GlobeIcon },
  { name: "ClickIcon", Icon: ClickIcon },
  { name: "FingerprintIcon", Icon: FingerprintIcon },
  { name: "BackspaceIcon", Icon: BackspaceIcon },
  { name: "CheckIcon", Icon: CheckIcon },
  { name: "ClockIcon", Icon: ClockIcon },
  { name: "CalendarIcon", Icon: CalendarIcon },
  { name: "ChevronRightIcon", Icon: ChevronRightIcon },
  { name: "ImageErrorIcon", Icon: ImageErrorIcon },
  { name: "ChatIcon", Icon: ChatIcon },
  { name: "ArrowNarrowLeftIcon", Icon: ArrowNarrowLeftIcon },
  { name: "HeartIcon", Icon: HeartIcon },
  { name: "CompassIcon", Icon: CompassIcon },
  { name: "BedIcon", Icon: BedIcon },
  { name: "BathIcon", Icon: BathIcon },
  { name: "RulerIcon", Icon: RulerIcon },
  { name: "MapPinFilledIcon", Icon: MapPinFilledIcon },
  { name: "MapPinIcon", Icon: MapPinIcon },
  { name: "SparkleIcon", Icon: SparkleIcon },
  { name: "WhatsappIcon", Icon: WhatsappIcon },
  { name: "WeChatIcon", Icon: WeChatIcon },
  { name: "ZaloIcon", Icon: ZaloIcon },
  { name: "LineIcon", Icon: LineIcon },
  { name: "BoldIcon", Icon: BoldIcon },
  { name: "ItalicIcon", Icon: ItalicIcon },
  { name: "UnderlineIcon", Icon: UnderlineIcon },
  { name: "CodeIcon", Icon: CodeIcon },
  { name: "ListBulletIcon", Icon: ListBulletIcon },
  { name: "ListOrderedIcon", Icon: ListOrderedIcon },
  { name: "AlignLeftIcon", Icon: AlignLeftIcon },
  { name: "AlignCenterIcon", Icon: AlignCenterIcon },
  { name: "AlignRightIcon", Icon: AlignRightIcon },
  { name: "TrashIcon", Icon: TrashIcon },
  { name: "FilterIcon", Icon: FilterIcon },
  { name: "PhotoUpIcon", Icon: PhotoUpIcon },
  { name: "InfoCircleIcon", Icon: InfoCircleIcon },
  { name: "ArrowBackIcon", Icon: ArrowBackIcon },
  { name: "WorldIcon", Icon: WorldIcon },
  { name: "LockIcon", Icon: LockIcon },
  { name: "CalculatorIcon", Icon: CalculatorIcon },
  { name: "ScaleIcon", Icon: ScaleIcon },
  { name: "BuildingStoreIcon", Icon: BuildingStoreIcon },
  { name: "HomePlusIcon", Icon: HomePlusIcon },
];

export const IconStory: Component = () => {
  return (
    <div class="space-y-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Icons
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Available icons from{" "}
          <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">
            ~/assets/icons
          </code>
        </p>
      </div>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          All Icons ({icons.length})
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <For each={icons}>
            {(item) => (
              <div class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <item.Icon class="w-8 h-8 text-gray-700 dark:text-gray-300" />
                <span class="mt-2 text-xs text-gray-500 dark:text-gray-400 font-mono text-center break-all">
                  {item.name}
                </span>
              </div>
            )}
          </For>
        </div>
      </section>

      <section>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Usage Example
        </h2>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <pre class="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {`import { BellIcon, SearchIcon, UserIcon } from "~/assets/icons";

// Use in component
<BellIcon class="w-6 h-6 text-primary" />
<SearchIcon class="w-5 h-5" />
<UserIcon />`}
          </pre>
        </div>
      </section>
    </div>
  );
};
